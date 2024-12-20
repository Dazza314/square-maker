import { useDndContext } from "@dnd-kit/core";
import CopySquareToClipboardButton from "./CopySquareToClipboard";
import DeleteAllButton from "./DeleteAllButton";
import DeleteAllExtraImagesButton from "./DeleteAllExtraImagesButton";
import DeleteZone from "./DeleteZone";
import DownloadSquareButton from "./DownloadSquareButton";
import ImportButton from "./ImportButton";
import "./Navbar.css";
import SaveToClipboardButton from "./SaveToClipboardButton";
import ScaleAdjust from "./ScaleAdjust";
import SquareSelect from "./SquareSelect";

function Navbar() {
  const { active } = useDndContext();
  return (
    <div className="navbar">
      <SquareSelect />
      <ScaleAdjust />
      <DownloadSquareButton />
      <CopySquareToClipboardButton />
      <DeleteAllButton />
      <DeleteAllExtraImagesButton />
      <SaveToClipboardButton />
      <ImportButton />
      {active ? <DeleteZone /> : null}
    </div>
  );
}

export default Navbar;
