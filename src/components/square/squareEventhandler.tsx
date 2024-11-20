import { PropsWithChildren, useContext, useEffect } from "react";
import { SquareDataContext } from "../../contexts/squareDataContext";
import { SquareData } from "../../types";
import { getKeyFromImageUrl } from "./squareUtils";

export function SquareEventHandler({ children }: PropsWithChildren) {
  const { setSquareData } = useContext(SquareDataContext);

  useEffect(() => {
    function pasteListener(e: ClipboardEvent) {
      for (const dataTransferItem of e.clipboardData?.items ?? []) {
        if (dataTransferItem.type === "text/plain") {
          dataTransferItem.getAsString((imageUrl) => {
            if (
              imageUrl.match(/^https?:\/\/.+\.(png|jpg|jpeg|bmp|gif|webp)$/)
            ) {
              setSquareData((prev) => addNewImage(prev, imageUrl));
            }
          });
        }
      }
    }

    function dropListener(e: DragEvent) {
      e.stopPropagation();
      e.preventDefault();
      const imageUrl = e.dataTransfer?.getData("URL");
      if (
        imageUrl &&
        imageUrl.match(/^https?:\/\/.+\.(png|jpg|jpeg|bmp|gif|webp)$/)
      ) {
        setSquareData((prev) => addNewImage(prev, imageUrl));
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
