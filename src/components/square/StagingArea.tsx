import { useDroppable } from "@dnd-kit/core";
import { useContext } from "react";
import { SquareContext } from "../../contexts/squareContext";
import DraggableImage from "./DraggableImage";
import "./StagingArea.css";

function StagingArea() {
    const { isOver, setNodeRef } = useDroppable({
        id: "stagingArea",
    });

    const { squareData } = useContext(SquareContext)

    const style = {
        color: isOver ? 'green' : undefined,
    };

    const itemInfos = squareData.stagingArea

    return (
        <div className="staging-area-container">
            <h3>Extra images</h3>
            <div className="staging-area-content" ref={setNodeRef} style={style}>
                {itemInfos.length === 0 ? "Drop or paste images here" : itemInfos.map((itemInfo) => (<DraggableImage key={itemInfo.imageUrl} imageUrl={itemInfo.imageUrl} />))}
            </div>
        </div>
    );
}

export default StagingArea