import { useDroppable } from "@dnd-kit/core";
import { CSSProperties, useContext } from "react";
import SquareDataContext from "../../contexts/SquareDataContext";
import { SquareDataKey } from "../../types";
import DraggableImage from "./DraggableImage";
import "./Droppable.css";

type Props = {
  dropId: Exclude<SquareDataKey, "stagingArea" | "deleteZone">;
};

function Droppable({ dropId }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: dropId,
  });

  const { squareData } = useContext(SquareDataContext);

  const itemInfo = squareData[dropId];

  const style: CSSProperties = {
    outline: isOver ? "1px solid #C5D3E8" : undefined,
  };

  return (
    <div className="sub-square" ref={setNodeRef} style={style}>
      {itemInfo ? <DraggableImage imageUrl={itemInfo.imageUrl} /> : null}
    </div>
  );
}

export default Droppable;
