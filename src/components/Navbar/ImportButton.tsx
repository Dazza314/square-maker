import { useContext, useRef, useState } from "react";
import { SquareContext } from "../../contexts/squareContext";
import useDialog, { Dialog } from "../Dialog/Dialog";
import { isSquareData } from "../square/squareUtils";
import "./ImportButton.css";

function ImportButton() {
  const { setSquareData } = useContext(SquareContext);
  const [label, setLabel] = useState("Import");

  const [text, setText] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, close] = useDialog(dialogRef.current);

  function onClick2() {
    open();
  }

  function onLoad() {
    try {
      const squareData = JSON.parse(text);
      if (isSquareData(squareData)) {
        setSquareData(squareData);
        setLabel("Data loaded");
        setTimeout(() => {
          setLabel("Import");
        }, 3000);
      } else {
        throw new Error();
      }
    } catch (e) {
      setLabel("Invalid data");
      setTimeout(() => {
        setLabel("Import");
      }, 3000);
    } finally {
      setText("");
      close();
    }
  }

  return (
    <>
      <Dialog ref={dialogRef}>
        <div className="load-dialog-container">
          <div>Paste here:</div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={onLoad} disabled={!text}>
            Load
          </button>
        </div>
      </Dialog>
      <button onClick={onClick2}>{label}</button>
    </>
  );
}

export default ImportButton;
