import { useContext } from "react";
import { SquareContext } from "../../contexts/squareContext";

function DeleteAllExtraImagesButton() {
  const { setSquareData } = useContext(SquareContext);

  function onClick() {
    setSquareData((prev) => ({ ...prev, stagingArea: [] }));
  }

  return <button onClick={onClick}>Delete all extra images</button>;
}

export default DeleteAllExtraImagesButton;
