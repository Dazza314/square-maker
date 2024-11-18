import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useContext } from 'react';
import { SquareContext } from '../../contexts/squareContext';
import { SquareData } from '../../types';
import { Range } from "../../utilTypes";
import Droppable from './Droppable';
import "./SquareContent.css";
import StagingArea from './StagingArea';



function SquareContent() {
    const { setSquareData } = useContext(SquareContext)

    return <div className='main-content'>
        <DndContext onDragEnd={handleDragEnd} autoScroll={false}>
            <div id="printCapture">
                <div className='square-content'>
                    <Droppable dropId={0} />
                    <Droppable dropId={1} />
                    <Droppable dropId={2} />
                    <Droppable dropId={3} />
                    <Droppable dropId={4} />
                    <Droppable dropId={5} />
                    <Droppable dropId={6} />
                    <Droppable dropId={7} />
                    <Droppable dropId={8} />
                    <Droppable dropId={9} />
                    <Droppable dropId={10} />
                    <Droppable dropId={11} />
                    <Droppable dropId={12} />
                    <Droppable dropId={13} />
                    <Droppable dropId={14} />
                    <Droppable dropId={15} />
                    <Droppable dropId={16} />
                    <Droppable dropId={17} />
                    <Droppable dropId={18} />
                    <Droppable dropId={19} />
                    <Droppable dropId={20} />
                    <Droppable dropId={21} />
                    <Droppable dropId={22} />
                    <Droppable dropId={23} />
                    <Droppable dropId={24} />
                    <Droppable dropId={25} />
                    <Droppable dropId={26} />
                    <Droppable dropId={27} />
                    <Droppable dropId={28} />
                    <Droppable dropId={29} />
                </div>
            </div>
            <StagingArea />
        </DndContext>
    </div>


    function handleDragEnd(event: DragEndEvent) {
        setSquareData(prev => {
            if (event.over) {
                return generateSquareData(prev, event.active.id, event.over.id as keyof SquareData)
            }
            else {
                return prev
            }
        })
    }
}

function generateSquareData(previousSquareData: SquareData, movedItemId: string | number, movedItemNewLocation: keyof SquareData): SquareData {
    if (typeof movedItemId === "number") {
        return previousSquareData
    }
    const itemOriginalLocation = findOriginalLocation(movedItemId, previousSquareData)
    if (itemOriginalLocation === movedItemNewLocation) {
        return previousSquareData
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

function findOriginalLocation(imageUrl: string, square: SquareData): keyof SquareData {
    for (let i = 0; i < 30; i++) {
        const j = i as Range<0, 29>[number];
        if (square[j]?.imageUrl === imageUrl) {
            return j;
        }
    }
    return "stagingArea"
}

export default SquareContent