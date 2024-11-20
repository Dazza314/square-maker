import { useContext } from "react";
import { SquareDataContext } from "../../contexts/squareDataContext";

function DeleteAllExtraImagesButton() {
  const { setSquareData } = useContext(SquareDataContext);

  function onClick() {
    setSquareData((prev) => ({ ...prev, stagingArea: [] }));
  }

  return <button onClick={onClick}>Delete all extra images</button>;
}

export default DeleteAllExtraImagesButton;
