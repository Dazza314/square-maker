import CopySquareToClipboardButton from "./CopySquareToClipboard"
import DownloadSquareButton from "./DownloadSquareButton"
import "./Navbar.css"

function Navbar() {
    return <div className="navbar">
        <DownloadSquareButton />
        <CopySquareToClipboardButton />
    </div>
}

export default Navbar