import { PropsWithChildren, useCallback, useMemo } from "react";
import { useSessionStorage } from "usehooks-ts";
import { getAllImageIds } from "../components/square/squareUtils";
import { deleteImages } from "../db/imageStore";
import { SquareData } from "../types";
import SquareDataContext, {
  generateEmptySquareData,
  SquareDataContextType,
} from "./SquareDataContext";

function SquareDataContextProvider({ children }: PropsWithChildren) {
  const [currentKey, setCurrentKey] = useSessionStorage("square-key", 0);
  const [keys, setKeys] = useSessionStorage<number[]>("square-keys", [
    currentKey,
  ]);

  const [squareData, setSquareData] = useSessionStorage<SquareData>(
    currentKey.toString(),
    generateEmptySquareData,
  );

  const changeSquare = useCallback(
    (key: number) => {
      const keyIndex = keys.indexOf(key);
      if (keyIndex === -1) {
        console.warn(
          `No such key:${key} exists. Current keys: ${keys}`,
        );
        return;
      }
      setCurrentKey(keys[keyIndex]);
    },
    [keys],
  );

  const newSquareKey = useCallback(() => {
    const newKey = keys[keys.length - 1] + 1;
    setKeys((prev) => [...prev, newKey]);
    setCurrentKey(newKey);
  }, [keys]);

  const removeCurrentSquareKey = useCallback(() => {
    if (keys.length < 2) {
      console.warn("Cannot delete last item");
      return;
    }
    const imageIds = getAllImageIds(squareData);
    deleteImages(imageIds);
    sessionStorage.removeItem(currentKey.toString());
    setKeys((prev) => {
      const index = prev.indexOf(currentKey);
      const newKeys = prev.toSpliced(index, 1);
      if (index === newKeys.length) {
        setCurrentKey(newKeys[index - 1]);
      } else {
        setCurrentKey(newKeys[index]);
      }
      return newKeys;
    });
  }, [keys, currentKey, squareData]);

  const value = useMemo<SquareDataContextType>(
    () => ({
      squareData,
      setSquareData,
      currentKey,
      savedSquareKeys: keys,
      changeSquare,
      newSquareKey,
      removeCurrentSquareKey,
    }),
    [
      setSquareData,
      squareData,
      currentKey,
      newSquareKey,
      changeSquare,
      keys,
    ],
  );

  return (
    <SquareDataContext.Provider value={value}>
      {children}
    </SquareDataContext.Provider>
  );
}

export default SquareDataContextProvider;
