import { useDroppable } from "@dnd-kit/core";
import { CSSProperties, useContext } from "react";
import { SquareContext } from "../../contexts/squareContext";
import { SquareDataKey } from "../../types";
import DraggableImage from "./DraggableImage";
import "./Droppable.css";

type Props = {
  dropId: Exclude<SquareDataKey, "stagingArea" | "deleteZone">;
};

function Droppable({ dropId }: Props) {
  const { isOver, setNodeRef, active } = useDroppable({
    id: dropId,
  });

  const { squareData } = useContext(SquareContext);

  const itemInfo = squareData[dropId];

  const isOverSelf = active?.id === itemInfo?.imageUrl;

  const showBorder = isOver && !(itemInfo && !isOverSelf);

  const style: CSSProperties = {
    outline: showBorder ? "1px solid #C5D3E8" : undefined,
  };

  return (
    <div className="sub-square" ref={setNodeRef} style={style}>
      {itemInfo ? <DraggableImage imageUrl={itemInfo.imageUrl} /> : null}
    </div>
  );
}

export default Droppable;
