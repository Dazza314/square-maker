import * as htmlToImage from "html-to-image";
import { useState } from "react";

function CopySquareToClipboardButton() {
  const [label, setLabel] = useState("Copy square");
  function copyToClipboard() {
    const square = document.getElementById("printCapture");
    if (square instanceof HTMLElement) {
      htmlToImage
        .toBlob(square, { backgroundColor: "#242424" })
        .then((blob) => {
          if (!blob) {
            return;
          }
          navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          setLabel("Copied!");
          setTimeout(() => setLabel("Copy square"), 3000);
        })
        .catch(() => {
          setLabel("Failed to copy!");
          setTimeout(() => setLabel("Copy square"), 3000);
        });
    }
  }
  return <button onClick={copyToClipboard}>{label}</button>;
}

export default CopySquareToClipboardButton;
