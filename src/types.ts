import { Range } from "./utilTypes"

export type ItemInfo = {
    imageUrl: string
}

export type SquareData =
    { [Key in Range<0, 29>[number]]: ItemInfo | null }
    & {
        stagingArea: ItemInfo[]
    }