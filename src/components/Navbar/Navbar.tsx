import { useDndContext } from "@dnd-kit/core";
import CopySquareToClipboardButton from "./CopySquareToClipboard";
import DeleteZone from "./DeleteZone";
import DownloadSquareButton from "./DownloadSquareButton";
import "./Navbar.css";

function Navbar() {
    const { active } = useDndContext();
    return <div className="navbar">
        <DownloadSquareButton />
        <CopySquareToClipboardButton />
        {active ? <DeleteZone /> : null}
    </div>
}

export default Navbar