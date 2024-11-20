import { v4 as uuidv4 } from "uuid";
import { deleteImage } from "../../db/imageStore";
import { ItemInfo, SquareData, SquareDataKey } from "../../types";
import { Range } from "../../utilTypes";

const IMAGE_ID_PREFIX = "IMAGE_ID_PREFIX";

export function generateImageId() {
  return `${IMAGE_ID_PREFIX}-${uuidv4()}`;
}

export function isImageId(x: string) {
  return x.startsWith(IMAGE_ID_PREFIX);
}

export function getKeyFromImageUrl(
  imageUrl: string,
  square: SquareData,
): keyof SquareData | null {
  for (let i = 0; i < 30; i++) {
    const j = i as Range<0, 29>[number];
    if (square[j]?.imageUrl === imageUrl) {
      return j;
    }
  }
  if (square.stagingArea.some((itemInfo) => itemInfo.imageUrl === imageUrl)) {
    return "stagingArea";
  }
  return null;
}

export function generateSquareData(
  previousSquareData: SquareData,
  movedItemId: string | number,
  movedItemNewLocation: SquareDataKey,
): SquareData {
  if (typeof movedItemId === "number") {
    return previousSquareData;
  }

  const itemOriginalLocation = getKeyFromImageUrl(
    movedItemId,
    previousSquareData,
  );

  if (itemOriginalLocation === null) {
    return previousSquareData;
  }

  if (itemOriginalLocation === movedItemNewLocation) {
    return previousSquareData;
  }

  if (movedItemNewLocation === "deleteZone") {
    deleteFromDbIfNecessary(movedItemId);
    if (itemOriginalLocation === "stagingArea") {
      const stagingAreaIndex = previousSquareData.stagingArea.findIndex(
        (x) => x.imageUrl === movedItemId,
      );
      if (stagingAreaIndex === -1) {
        return previousSquareData;
      }
      const newStagingArea = previousSquareData.stagingArea.toSpliced(
        stagingAreaIndex,
        1,
      );
      return { ...previousSquareData, stagingArea: newStagingArea };
    } else {
      return { ...previousSquareData, [itemOriginalLocation]: null };
    }
  }

  if (itemOriginalLocation === "stagingArea") {
    const stagingAreaIndex = previousSquareData.stagingArea.findIndex(
      (x) => x.imageUrl === movedItemId,
    );
    if (stagingAreaIndex === -1) {
      return previousSquareData;
    }
    const newStagingArea = previousSquareData.stagingArea.toSpliced(
      stagingAreaIndex,
      1,
    );
    if (previousSquareData[movedItemNewLocation]) {
      if (movedItemNewLocation === "stagingArea") {
        return previousSquareData;
      }
      return {
        ...previousSquareData,
        [movedItemNewLocation]: { imageUrl: movedItemId },
        stagingArea: [
          ...newStagingArea,
          previousSquareData[movedItemNewLocation],
        ],
      };
    }
    return {
      ...previousSquareData,
      [movedItemNewLocation]: { imageUrl: movedItemId },
      stagingArea: newStagingArea,
    };
  }

  if (movedItemNewLocation === "stagingArea") {
    const newStagingArea = [
      ...previousSquareData.stagingArea,
      { imageUrl: movedItemId },
    ];
    return {
      ...previousSquareData,
      stagingArea: newStagingArea,
      [itemOriginalLocation]: null,
    };
  }

  if (previousSquareData[movedItemNewLocation]) {
    return {
      ...previousSquareData,
      [movedItemNewLocation]: { imageUrl: movedItemId },
      [itemOriginalLocation]: previousSquareData[movedItemNewLocation],
    };
  }

  return {
    ...previousSquareData,
    [movedItemNewLocation]: { imageUrl: movedItemId },
    [itemOriginalLocation]: null,
  };
}

function deleteFromDbIfNecessary(movedItemId: string) {
  if (isImageId(movedItemId)) {
    void deleteImage(movedItemId);
  }
}

function isItemInfo(value: any): value is ItemInfo {
  return value && typeof value.imageUrl === "string";
}

function isitemInfoOrNull(value: any): value is ItemInfo | null {
  if (value === null) {
    return true;
  }
  return isItemInfo(value);
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

export function getAllStagingAreaImageIds(square: SquareData) {
  return square.stagingArea.reduce<string[]>((acc, curr) => {
    if (isImageId(curr.imageUrl)) {
      acc.push(curr.imageUrl);
    }
    return acc;
  }, []);
}

export function getAllImageIds(square: SquareData) {
  return [Object.values(square), ...square.stagingArea].reduce<string[]>(
    (acc, curr) => {
      if (Array.isArray(curr)) {
        return acc;
      }
      if (isImageId(curr.imageUrl)) {
        acc.push(curr.imageUrl);
      }
      return acc;
    },
    [],
  );
}
