import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo } from "react";
import { SquareData } from "../types";
import { Range } from "../utilTypes";


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
                    dataTransferItem.getAsString(imageUrl => {
                        if (imageUrl.match(/^https?:\/\/.+\.(png|jpg|jpeg|bmp|gif|webp)$/)) {
                            setSquareData(prev => addNewImage(prev, imageUrl))
                        }
                    }
                    )
                }
            }
        }

        function dropListener(e: DragEvent) {
            e.stopPropagation();
            e.preventDefault();
            const imageUrl = e.dataTransfer?.getData('URL');
            if (imageUrl) {
                setSquareData(prev => addNewImage(prev, imageUrl))
            }
        }

        function noop(e: any) {
            e.stopPropagation();
            e.preventDefault();
        }

        window.addEventListener("paste", pasteListener)
        window.addEventListener("drop", dropListener, false)
        window.addEventListener('dragenter', noop, false);
        window.addEventListener('dragexit', noop, false);
        window.addEventListener('dragover', noop, false);

        return () => {
            window.removeEventListener("paste", pasteListener)
            window.removeEventListener("drop", dropListener)
            window.removeEventListener('dragenter', noop);
            window.removeEventListener('dragexit', noop);
            window.removeEventListener('dragover', noop);
        }
    }, [])

    const value = useMemo(() => ({
        squareData, setSquareData
    }), [setSquareData, squareData])

    return <SquareContext.Provider value={value}>
        {children}
    </SquareContext.Provider>
}

function addNewImage(prevSquareData: SquareData, imageUrl: string) {
    const existingKey = getKeyFromImageUrl(imageUrl, prevSquareData)
    if (existingKey !== null) {
        return prevSquareData
    }
    return ({ ...prevSquareData, stagingArea: [...prevSquareData.stagingArea, { imageUrl }] })
}

export function getKeyFromImageUrl(imageUrl: string, square: SquareData): (keyof SquareData) | null {
    for (let i = 0; i < 30; i++) {
        const j = i as Range<0, 29>[number];
        if (square[j]?.imageUrl === imageUrl) {
            return j;
        }
    }
    if (square.stagingArea.some(itemInfo => itemInfo.imageUrl === imageUrl)) {
        return "stagingArea"
    }
    return null
}