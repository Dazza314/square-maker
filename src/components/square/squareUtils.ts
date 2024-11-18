import { SquareData, SquareDataKey } from "../../types";
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
    if (movedItemNewLocation !== "stagingArea" && movedItemNewLocation !== "deleteZone" && previousSquareData[movedItemNewLocation]) {
        // Cannot drop into zone which already contains an image
        return previousSquareData
    }

    const itemOriginalLocation = getKeyFromImageUrl(movedItemId, previousSquareData)
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