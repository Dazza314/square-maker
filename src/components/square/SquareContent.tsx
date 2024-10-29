import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useContext } from 'react';
import { SquareContext } from '../../contexts/squareContext';
import { SquareData } from '../../types';
import Droppable from './Droppable';
import "./SquareContent.css";
import StagingArea from './StagingArea';



function SquareContent() {
    const { setSquareData } = useContext(SquareContext)

    return <div className='main-content'>
        <DndContext onDragEnd={handleDragEnd}>
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
            <StagingArea />
        </DndContext>
    </div>


    function handleDragEnd(event: DragEndEvent) {
        setSquareData(prev => {
            if (event.over) {
                return generateSquareData(prev, event.active.id as keyof SquareData, event.over.id as keyof SquareData)
            }
            else {
                return prev
            }
        })
    }
}

function generateSquareData(previousSquareData: SquareData, movedItemOriginalLocation: keyof SquareData, movedItemNewLocation: keyof SquareData): SquareData {
    //TODO
    return previousSquareData
}

export default SquareContent