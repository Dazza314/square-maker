import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useSessionStorage } from "usehooks-ts";
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

type SquareDataContextType = {
  squareData: SquareData;
  setSquareData: Dispatch<SetStateAction<SquareData>>;
  savedSquareKeys: number[];
  currentKey: number;
  changeSquare: (key: number) => void;
  newSquareKey: () => void;
  removeCurrentSquareKey: () => void;
};

export const SquareDataContext = createContext<SquareDataContextType>({
  squareData: generateEmptySquareData(),
  setSquareData: () => {},
  currentKey: 0,
  savedSquareKeys: [],
  changeSquare: () => {},
  newSquareKey: () => {},
  removeCurrentSquareKey: () => {},
});

export function SquareDataContextProvider({ children }: PropsWithChildren) {
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
        console.warn(`No such key:${key} exists. Current keys: ${keys}`);
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
    sessionStorage.removeItem(currentKey.toString());
    const index = keys.indexOf(currentKey);
    if (index === keys.length - 1) {
      setCurrentKey(keys[index - 1]);
    }
    setKeys((prev) => prev.toSpliced(index, 1));
  }, [keys, currentKey]);

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
    [setSquareData, squareData, currentKey, newSquareKey, changeSquare, keys],
  );

  return (
    <SquareDataContext.Provider value={value}>
      {children}
    </SquareDataContext.Provider>
  );
}
