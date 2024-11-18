import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useContext } from 'react';
import { getKeyFromImageUrl, SquareContext } from '../../contexts/squareContext';
import { SquareData, SquareDataKey } from '../../types';
import Droppable from './Droppable';
import "./SquareContent.css";
import StagingArea from './StagingArea';



function SquareContent() {
    const { setSquareData } = useContext(SquareContext)

    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    console.log(viewportHeight)

    const gridCellSize = Math.floor((viewportHeight - 140) / 24)

    return <div className='main-content'>
        <DndContext onDragEnd={handleDragEnd} autoScroll={false}>
            <div id="printCapture" className='square-content' style={{
                gridTemplateColumns: `repeat(24, ${gridCellSize}px)`, gridTemplateRows: `repeat(24, ${gridCellSize}px)`
            }}>
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
            <StagingArea />
        </DndContext>
    </div>


    function handleDragEnd(event: DragEndEvent) {
        setSquareData(prev => {
            if (event.over) {
                return generateSquareData(prev, event.active.id, event.over.id as SquareDataKey)
            }
            else {
                return prev
            }
        })
    }
}

function generateSquareData(previousSquareData: SquareData, movedItemId: string | number, movedItemNewLocation: SquareDataKey): SquareData {
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



export default SquareContent