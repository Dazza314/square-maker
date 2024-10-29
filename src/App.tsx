import { useState } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import SquareContent from "./components/square/SquareContent"
import { generateEmptySquareData, SquareContentProvider } from "./contexts/squareContext"
import { SquareData } from "./types"

function App() {
  const [squareData, setSquareData] = useState<SquareData>(generateEmptySquareData)

  return (
    <>
      <h1 className="title">Square maker</h1>
      <Navbar />
      <SquareContentProvider
        squareData={squareData} setSquareData={setSquareData}
      >

        <SquareContent />
      </SquareContentProvider>
    </>
  )
}

export default App
