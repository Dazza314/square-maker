import { useContext } from "react";
import SquareDataContext from "../../contexts/SquareDataContext";
import { deleteImages } from "../../db/imageStore";
import { getAllStagingAreaImageIds } from "../square/squareUtils";

function DeleteAllExtraImagesButton() {
  const { setSquareData } = useContext(SquareDataContext);

  function onClick() {
    setSquareData((prev) => {
      deleteImages(getAllStagingAreaImageIds(prev));
      return ({ ...prev, stagingArea: [] });
    });
  }

  return <button onClick={onClick}>Delete all extra images</button>;
}

export default DeleteAllExtraImagesButton;
