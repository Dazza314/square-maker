import { useContext, useState } from "react"
import { SquareContext } from "../../contexts/squareContext"
import { isSquareData } from "../square/squareUtils"

function LoadFromClipboardButton() {
    const { setSquareData } = useContext(SquareContext)
    const [label, setLabel] = useState("Load from clipboard")

    function onClick() {
        navigator.clipboard.readText()
            .then(text => {
                const squareData = JSON.parse(text)
                if (isSquareData(squareData)) {
                    setSquareData(squareData)
                }
            })
            .catch(() => {
                setLabel("Invalid data")
                setTimeout(() => {
                    setLabel("Load from clipboard")
                }, 3000);
            })
    }
    return <button onClick={onClick}>{label}</button>
}

export default LoadFromClipboardButton