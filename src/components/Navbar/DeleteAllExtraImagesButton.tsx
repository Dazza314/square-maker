import { useContext } from "react"
import { SquareContext } from "../../contexts/squareContext"

function DeleteAllExtraImagesButton() {
    const { setSquareData } = useContext(SquareContext)
    return <button onClick={() => { setSquareData(prev => ({ ...prev, stagingArea: [] })) }}>Delete all extra images</button>
}

export default DeleteAllExtraImagesButton