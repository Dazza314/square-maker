import { useContext } from "react";
import {
  generateEmptySquareData,
  SquareEventContext,
} from "../../contexts/squareEventContext";

function DeleteAllButton() {
  const { setSquareData } = useContext(SquareEventContext);

  function onClick() {
    setSquareData(generateEmptySquareData());
  }

  return <button onClick={onClick}>Delete all images</button>;
}

export default DeleteAllButton;
