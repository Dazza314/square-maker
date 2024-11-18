import { useContext } from "react"
import { generateEmptySquareData, SquareContext } from "../../contexts/squareContext"

function DeleteAllButton() {
    const { setSquareData } = useContext(SquareContext)
    return <button onClick={() => { setSquareData(generateEmptySquareData()) }}>Delete all images</button>
}

export default DeleteAllButton