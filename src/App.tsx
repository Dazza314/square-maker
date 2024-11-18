import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { useState } from "react"
import { useSessionStorage } from "usehooks-ts"
import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import DraggingImage from "./components/square/DraggingImage"
import SquareContent from "./components/square/SquareContent"
import { generateSquareData } from "./components/square/squareUtils"
import { generateEmptySquareData, SquareContentProvider } from "./contexts/squareContext"
import { SquareData, SquareDataKey } from "./types"

const DEFAULT_KEY = "square-maker-0"

function App() {
  const [squareData, setSquareData] = useSessionStorage<SquareData>(DEFAULT_KEY, generateEmptySquareData)
  const [activeId, setActiveId] = useState<string | number | null>(null);

  return (
    <>
      <h1 className="title">Square maker</h1>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} autoScroll={false}>
        <Navbar />
        <SquareContentProvider
          squareData={squareData} setSquareData={setSquareData}
        >
          <SquareContent />
        </SquareContentProvider>
        <DragOverlay
          dropAnimation={null}
        >
          {typeof activeId === "string" ? (
            <DraggingImage imageUrl={activeId} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  )

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    setSquareData(prev => {
      if (event.over) {
        return generateSquareData(prev, event.active.id, event.over.id as SquareDataKey)
      }
      else {
        return prev
      }
    })
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }


}

export default App
