import { useContext } from "react";
import { SquareEventContext } from "../../contexts/squareEventContext";

function SaveToClipboardButton() {
  const { squareData } = useContext(SquareEventContext);

  function onClick() {
    navigator.clipboard.writeText(JSON.stringify(squareData));
  }
  return <button onClick={onClick}>Save to clipboard</button>;
}

export default SaveToClipboardButton;
