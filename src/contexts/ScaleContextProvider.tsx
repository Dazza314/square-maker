import { PropsWithChildren, useContext, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import ScaleContext, { ScaleContextType } from "./ScaleContext";
import SquareDataContext from "./SquareDataContext";

const SCALE_KEY_PREFIX = "scale-key-prefix";

function getScaleKeyFromCurrentSquareKey(currentSquareKey: number) {
    return `${SCALE_KEY_PREFIX}-${currentSquareKey}`;
}

function ScaleContextProvider({ children }: PropsWithChildren) {
    const { currentKey } = useContext(SquareDataContext);
    const [scale, setScale] = useLocalStorage(
        getScaleKeyFromCurrentSquareKey(currentKey),
        1,
    );

    const value = useMemo<ScaleContextType>(() => ({
        scale,
        setScale,
    }), [scale]);

    return (
        <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
    );
}

export default ScaleContextProvider;
