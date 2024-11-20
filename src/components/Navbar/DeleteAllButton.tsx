import { useContext } from "react";
import {
  generateEmptySquareData,
  SquareContext,
} from "../../contexts/squareContext";

function DeleteAllButton() {
  const { setSquareData } = useContext(SquareContext);

  function onClick() {
    setSquareData(generateEmptySquareData());
  }

  return <button onClick={onClick}>Delete all images</button>;
}

export default DeleteAllButton;
