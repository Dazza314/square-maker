import { useContext } from "react";
import { SquareEventContext } from "../../contexts/squareEventContext";

function DeleteAllExtraImagesButton() {
  const { setSquareData } = useContext(SquareEventContext);

  function onClick() {
    setSquareData((prev) => ({ ...prev, stagingArea: [] }));
  }

  return <button onClick={onClick}>Delete all extra images</button>;
}

export default DeleteAllExtraImagesButton;
