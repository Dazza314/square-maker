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

const DEFAULT_KEY = "square-maker-0";

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
  savedSqaureKeys: string[];
  changeSquare: (key: string) => void;
  newSquareKey: (key: string) => void;
};

export const SquareDataContext = createContext<SquareDataContextType>({
  squareData: generateEmptySquareData(),
  setSquareData: () => {},
  savedSqaureKeys: [],
  changeSquare: () => {},
  newSquareKey: () => {},
});

export function SquareDataContextProvider({ children }: PropsWithChildren) {
  const [currentKey, setCurrentKey] = useSessionStorage(
    "square-key",
    DEFAULT_KEY,
  );
  const [keys, setKeys] = useSessionStorage<string[]>("square-keys", []);

  const [squareData, setSquareData] = useSessionStorage<SquareData>(
    currentKey,
    generateEmptySquareData,
  );

  const changeSquare = useCallback(
    (key: string) => {
      const keyIndex = keys.indexOf(key);
      if (keyIndex === -1) {
        console.warn(`No such key:${key} exists. Current keys: ${keys}`);
        return;
      }
      setCurrentKey(keys[keyIndex]);
    },
    [keys],
  );

  const newSquareKey = useCallback(
    (key: string) => {
      if (keys.includes(key)) {
        console.warn(`Duplicate key: ${key} cannot be used`);
        return;
      }
      setKeys((prev) => [...prev, key]);
    },
    [keys],
  );

  const value = useMemo<SquareDataContextType>(
    () => ({
      squareData,
      setSquareData,
      savedSqaureKeys: keys,
      changeSquare,
      newSquareKey,
    }),
    [setSquareData, squareData, newSquareKey, changeSquare, keys],
  );

  return (
    <SquareDataContext.Provider value={value}>
      {children}
    </SquareDataContext.Provider>
  );
}
