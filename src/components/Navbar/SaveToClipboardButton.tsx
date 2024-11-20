import { useContext } from "react";
import { SquareContext } from "../../contexts/squareContext";

function SaveToClipboardButton() {
  const { squareData } = useContext(SquareContext);

  function onClick() {
    navigator.clipboard.writeText(JSON.stringify(squareData));
  }
  return <button onClick={onClick}>Save to clipboard</button>;
}

export default SaveToClipboardButton;
