import { ChangeEvent, useContext } from "react";
import AddIcon from "../../assets/add.svg?react";
import DeleteIcon from "../../assets/delete.svg?react";
import { SquareDataContext } from "../../contexts/squareDataContext";
import "./SquareSelect.css";

function SquareSelect() {
  const {
    currentKey,
    savedSquareKeys: savedSqaureKeys,
    newSquareKey,
    changeSquare,
    removeCurrentSquareKey,
  } = useContext(SquareDataContext);

  function onSquareSelect(e: ChangeEvent<HTMLSelectElement>) {
    changeSquare(parseInt(e.target.value));
  }

  function onNewClick() {
    newSquareKey();
  }

  function onDeleteClick() {
    removeCurrentSquareKey();
  }

  const isDeleteButtonDisabled = savedSqaureKeys.length < 2;

  return (
    <div className="square-select-container">
      <select value={currentKey} onChange={onSquareSelect}>
        {savedSqaureKeys.map((key) => <option key={key}>{key}</option>)}
      </select>
      <button onClick={onNewClick}>
        <AddIcon />
      </button>
      <button onClick={onDeleteClick} disabled={isDeleteButtonDisabled}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default SquareSelect;
