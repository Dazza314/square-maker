import { useDroppable } from "@dnd-kit/core";
import { CSSProperties, useContext } from "react";
import SquareDataContext from "../../contexts/SquareDataContext";
import DraggableImage from "./DraggableImage";
import "./StagingArea.css";

function StagingArea() {
  const { isOver, setNodeRef } = useDroppable({
    id: "stagingArea",
  });

  const { squareData } = useContext(SquareDataContext);

  const style: CSSProperties = {
    borderColor: isOver ? "#C5D3E8" : undefined,
    color: isOver ? "#C5D3E8" : undefined,
  };

  const itemInfos = squareData.stagingArea;

  return (
    <div className="staging-area-container">
      <h3>Extra images</h3>
      <div className="staging-area-content-wrapper" style={style}>
        <div className="staging-area-content" ref={setNodeRef}>
          {itemInfos.length === 0
            ? "Drop or paste images here"
            : itemInfos.map((itemInfo) => (
              <DraggableImage
                key={itemInfo.imageUrl}
                imageUrl={itemInfo.imageUrl}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default StagingArea;
