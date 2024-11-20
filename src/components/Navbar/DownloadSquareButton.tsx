import * as htmlToImage from "html-to-image";

function DownloadSquareButton() {
  function saveToPng() {
    const square = document.getElementById("printCapture");
    if (square instanceof HTMLElement) {
      htmlToImage.toPng(square).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `square.png`;
        link.href = dataUrl;
        link.click();
        link.remove();
      });
    }
  }
  return <button onClick={saveToPng}>Download square</button>;
}

export default DownloadSquareButton;
