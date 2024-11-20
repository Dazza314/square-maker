import { ItemInfo, SquareData, SquareDataKey } from "../../types";
import { Range } from "../../utilTypes";

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

export function generateSquareData(previousSquareData: SquareData, movedItemId: string | number, movedItemNewLocation: SquareDataKey): SquareData {
    if (typeof movedItemId === "number") {
        return previousSquareData
    }
    
    const itemOriginalLocation = getKeyFromImageUrl(movedItemId, previousSquareData)
    if (itemOriginalLocation !== null && movedItemNewLocation !== "stagingArea" && movedItemNewLocation !== "deleteZone" && previousSquareData[movedItemNewLocation]) {
        // Swap
        return {...previousSquareData, [movedItemNewLocation]:{ imageUrl: movedItemId },[itemOriginalLocation]: previousSquareData[movedItemNewLocation]}
    }

    if (itemOriginalLocation === null) {
        return previousSquareData
    }

    if (itemOriginalLocation === movedItemNewLocation) {
        return previousSquareData
    }

    if (movedItemNewLocation === "deleteZone") {
        if (itemOriginalLocation === "stagingArea") {
            const stagingAreaIndex = previousSquareData.stagingArea.findIndex(x => x.imageUrl === movedItemId)
            if (stagingAreaIndex >= 0) {
                const newStagingArea = previousSquareData.stagingArea.toSpliced(stagingAreaIndex, 1)
                return { ...previousSquareData, stagingArea: newStagingArea }
            }
        } else {
            return { ...previousSquareData, [itemOriginalLocation]: null }
        }
    }

    if (itemOriginalLocation === "stagingArea") {
        const stagingAreaIndex = previousSquareData.stagingArea.findIndex(x => x.imageUrl === movedItemId)
        if (stagingAreaIndex >= 0) {
            const newStagingArea = previousSquareData.stagingArea.toSpliced(stagingAreaIndex, 1)
            return { ...previousSquareData, [movedItemNewLocation]: { imageUrl: movedItemId }, stagingArea: newStagingArea }
        }
    }

    if (movedItemNewLocation === "stagingArea") {
        const newStagingArea = [...previousSquareData.stagingArea, { imageUrl: movedItemId }]
        return { ...previousSquareData, stagingArea: newStagingArea, [itemOriginalLocation]: null }
    }

    return { ...previousSquareData, [movedItemNewLocation]: { imageUrl: movedItemId }, [itemOriginalLocation]: null }
}


function isItemInfo(value: any): value is ItemInfo {
    return value && typeof value.imageUrl === "string";
}

function isitemInfoOrNull(value:any):value is ItemInfo|null{
    if(value===null){
        return true
    }
    return isItemInfo(value)
}

export function isSquareData(value: any): value is SquareData {
    if (
        typeof value !== "object" ||
        value === null ||
        !Array.isArray(value.stagingArea) ||
        !value.stagingArea.every(isItemInfo)
    ) {
        return false;
    }

    for (let i = 0; i < 30; i++) {
        if (!isitemInfoOrNull(value[i])) {
            return false;
        }
    }

    return true;
}