import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import { getKeyFromImageUrl } from "../components/square/squareUtils";
import { SquareData } from "../types";

export function generateEmptySquareData(): SquareData {
  return {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null,
    19: null,
    20: null,
    21: null,
    22: null,
    23: null,
    24: null,
    25: null,
    26: null,
    27: null,
    28: null,
    29: null,
    stagingArea: [],
  };
}

type SquareEventContextType = {
  squareData: SquareData;
  setSquareData: Dispatch<SetStateAction<SquareData>>;
};

export const SquareEventContext = createContext<SquareEventContextType>({
  squareData: generateEmptySquareData(),
  setSquareData: () => { },
});

export function SquareEventContextProvider({
  squareData,
  setSquareData,
  children,
}: PropsWithChildren<SquareEventContextType>) {
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

  const value = useMemo(
    () => ({
      squareData,
      setSquareData,
    }),
    [setSquareData, squareData],
  );

  return (
    <SquareEventContext.Provider value={value}>{children}</SquareEventContext.Provider>
  );
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
