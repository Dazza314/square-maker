import { useContext } from "react";
import {
  generateEmptySquareData,
  SquareDataContext,
} from "../../contexts/squareDataContext";
import { deleteImages } from "../../db/imageStore";
import { getAllImageIds } from "../square/squareUtils";

function DeleteAllButton() {
  const { setSquareData } = useContext(SquareDataContext);

  async function onClick() {
    setSquareData((prev) => {
      const imageIds = getAllImageIds(prev);
      deleteImages(imageIds);
      return generateEmptySquareData();
    });
  }

  return <button onClick={onClick}>Delete all images</button>;
}

export default DeleteAllButton;
