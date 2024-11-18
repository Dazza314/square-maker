import { useDroppable } from "@dnd-kit/core";
import DeleteIcon from "../../assets/delete.png";
import "./DeleteZone.css";

function DeleteZone() {
    const { setNodeRef } = useDroppable({
        id: "deleteZone",
    });

    return <div className="delete-zone" ref={setNodeRef}>
        <img src={DeleteIcon} />
    </div>
}

export default DeleteZone