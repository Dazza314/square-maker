import { useContext } from "react";
import SquareDataContext from "../../contexts/SquareDataContext";

function SaveToClipboardButton() {
  const { squareData } = useContext(SquareDataContext);

  function onClick() {
    navigator.clipboard.writeText(JSON.stringify(squareData));
  }
  return <button onClick={onClick}>Save to clipboard</button>;
}

export default SaveToClipboardButton;
