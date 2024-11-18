import { useDndContext } from "@dnd-kit/core";
import CopySquareToClipboardButton from "./CopySquareToClipboard";
import DeleteAllButton from "./DeleteAllButton";
import DeleteAllExtraImagesButton from "./DeleteAllExtraImagesButton";
import DeleteZone from "./DeleteZone";
import DownloadSquareButton from "./DownloadSquareButton";
import LoadFromClipboardButton from "./LoadFromClipboardButton";
import "./Navbar.css";
import SaveToClipboardButton from "./SaveToClipboardButton";

function Navbar() {
    const { active } = useDndContext();
    return <div className="navbar">
        <DownloadSquareButton />
        <CopySquareToClipboardButton />
        <DeleteAllButton />
        <DeleteAllExtraImagesButton />
        <SaveToClipboardButton />
        <LoadFromClipboardButton />
        {active ? <DeleteZone /> : null}
    </div>
}

export default Navbar