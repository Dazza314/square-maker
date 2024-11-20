import { useDroppable } from "@dnd-kit/core";
import DeleteIcon from "../../assets/delete.svg?react";
import "./DeleteZone.css";

function DeleteZone() {
  const { setNodeRef } = useDroppable({
    id: "deleteZone",
  });

  return (
    <div className="delete-zone" ref={setNodeRef}>
      <DeleteIcon />
    </div>
  );
}

export default DeleteZone;
