import { PropsWithChildren, useContext, useEffect } from "react";
import SquareDataContext from "../../contexts/SquareDataContext";
import { storeImage } from "../../db/imageStore";
import { SquareData } from "../../types";
import { generateImageId, getKeyFromImageUrl } from "./squareUtils";

export function SquareEventHandler({ children }: PropsWithChildren) {
  const { setSquareData } = useContext(SquareDataContext);

  useEffect(() => {
    async function pasteListener(e: ClipboardEvent) {
      const imageUrl = await getImageUrl(e.clipboardData?.items);
      if (imageUrl) {
        setSquareData((prev) => addNewImage(prev, imageUrl));
      }
    }

    async function dropListener(e: DragEvent) {
      e.stopPropagation();
      e.preventDefault();

      // Three step approach

      // Ideally we can use the image's URL directly
      const imageUrl = e.dataTransfer?.getData("URL");
      if (
        imageUrl &&
        imageUrl.match(/^https?:\/\/.+\.(png|jpg|jpeg|bmp|gif|webp)$/)
      ) {
        setSquareData((prev) => addNewImage(prev, imageUrl));
        return;
      }

      // Second choice is using the `src` of the image (e.g. for base64 encoded)
      for (let dataTransferItem of e.dataTransfer?.items ?? []) {
        if (dataTransferItem.type === "text/html") {
          dataTransferItem.getAsString((html) => {
            const src = new DOMParser().parseFromString(html, "text/html")
              ?.querySelector("img")?.src;
            if (src) {
              setSquareData((prev) => addNewImage(prev, src));
              return;
            }
          });
        }
      }

      // Last choice, we get the image blob
      const imageId = await getImageBlob(e.dataTransfer?.items);
      if (imageId) {
        setSquareData((prev) => addNewImage(prev, imageId));
      }
    }

    function noop(e: any) {
      e.stopPropagation();
      e.preventDefault();
    }

    window.addEventListener("paste", pasteListener);
    window.addEventListener("drop", dropListener, false);
    window.addEventListener("dragenter", noop, false);
    window.addEventListener("dragexit", noop, false);
    window.addEventListener("dragover", noop, false);

    return () => {
      window.removeEventListener("paste", pasteListener);
      window.removeEventListener("drop", dropListener);
      window.removeEventListener("dragenter", noop);
      window.removeEventListener("dragexit", noop);
      window.removeEventListener("dragover", noop);
    };
  }, []);

  return children;
}

async function getImageUrl(
  dataTransferItems: DataTransferItemList | undefined,
) {
  for (const dataTransferItem of dataTransferItems ?? []) {
    if (dataTransferItem.type === "text/plain") {
      const result = await new Promise<string | null>((resolve) =>
        dataTransferItem.getAsString((imageUrl) => {
          if (
            imageUrl.match(/^https?:\/\/.+\.(png|jpg|jpeg|bmp|gif|webp)$/)
          ) {
            resolve(imageUrl);
          }
          resolve(null);
        })
      );
      if (result) {
        return result;
      }
    }
  }
  return null;
}

async function getImageBlob(
  dataTransferItems: DataTransferItemList | undefined,
) {
  for (let dataTransferItem of dataTransferItems ?? []) {
    console.log(dataTransferItem.type);
    if (dataTransferItem.type.startsWith("image")) {
      const file = dataTransferItem.getAsFile();
      if (file) {
        const id = generateImageId();
        await storeImage(id, file);
        return id;
      }
    }
  }
  return null;
}

function addNewImage(prevSquareData: SquareData, imageUrl: string) {
  const existingKey = getKeyFromImageUrl(imageUrl, prevSquareData);
  if (existingKey !== null) {
    return prevSquareData;
  }
  return {
    ...prevSquareData,
    stagingArea: [...prevSquareData.stagingArea, { imageUrl }],
  };
}
