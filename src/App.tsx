import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useState } from "react"
import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import SquareContent from "./components/square/SquareContent"
import { generateSquareData } from "./components/square/squareUtils"
import { generateEmptySquareData, SquareContentProvider } from "./contexts/squareContext"
import { SquareData, SquareDataKey } from "./types"

function App() {
  const [squareData, setSquareData] = useState<SquareData>(generateEmptySquareData)

  return (
    <>
      <h1 className="title">Square maker</h1>
      <DndContext onDragEnd={handleDragEnd} autoScroll={false}>
        <Navbar />
        <SquareContentProvider
          squareData={squareData} setSquareData={setSquareData}
        >
          <SquareContent />
        </SquareContentProvider>
      </DndContext>
    </>
  )

  function handleDragEnd(event: DragEndEvent) {
    setSquareData(prev => {
      if (event.over) {
        return generateSquareData(prev, event.active.id, event.over.id as SquareDataKey)
      }
      else {
        return prev
      }
    })
  }
}

export default App
