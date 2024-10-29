import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo } from "react";
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
        stagingArea: []
    }
}

type SquareContextType = {
    squareData: SquareData;
    setSquareData: Dispatch<SetStateAction<SquareData>>
}

export const SquareContext = createContext<SquareContextType>({ squareData: generateEmptySquareData(), setSquareData: () => { } })



export function SquareContentProvider({ squareData, setSquareData, children }: PropsWithChildren<SquareContextType>) {
    useEffect(() => {
        function pasteListener(e: ClipboardEvent) {
            for (const dataTransferItem of e.clipboardData?.items ?? []) {
                if (dataTransferItem.type === "text/plain") {
                    //TODO validation
                    dataTransferItem.getAsString(x => setSquareData(prev => ({ ...prev, stagingArea: [...prev.stagingArea, { imageUrl: x }] })))
                }
            }
        }

        window.addEventListener("paste", pasteListener)

        return () => {
            window.removeEventListener("paste", pasteListener)
        }
    })

    const value = useMemo(() => ({
        squareData, setSquareData
    }), [setSquareData, squareData])

    return <SquareContext.Provider value={value}>
        {children}
    </SquareContext.Provider>
}

