import { useContext } from "react";
import {
  generateEmptySquareData,
  SquareDataContext,
} from "../../contexts/squareDataContext";

function DeleteAllButton() {
  const { setSquareData } = useContext(SquareDataContext);

  function onClick() {
    setSquareData(generateEmptySquareData());
  }

  return <button onClick={onClick}>Delete all images</button>;
}

export default DeleteAllButton;
