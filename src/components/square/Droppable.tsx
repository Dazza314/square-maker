
import { useDroppable } from '@dnd-kit/core';
import { useContext } from 'react';
import { SquareContext } from '../../contexts/squareContext';
import { SquareData } from '../../types';
import DraggableImage from './DraggableImage';
import "./Droppable.css";

type Props = {
    dropId: Exclude<keyof SquareData, "stagingArea">
}

function Droppable({ dropId }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id: dropId,
    });

    const { squareData } = useContext(SquareContext)


    const style = {
        color: isOver ? 'green' : undefined,
    };

    const itemInfo = squareData[dropId]

    return (
        <div className='sub-square' ref={setNodeRef} style={style}>
            {itemInfo ? <DraggableImage imageUrl={itemInfo.imageUrl} /> : null}
        </div>
    );
}

export default Droppable