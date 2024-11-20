import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DraggingImage from "./components/square/DraggingImage";
import SquareContent from "./components/square/SquareContent";
import {
  generateSquareData,
  getKeyFromImageUrl,
} from "./components/square/squareUtils";
import {
  generateEmptySquareData,
  SquareEventContextProvider,
} from "./contexts/squareEventContext";
import { SquareData, SquareDataKey } from "./types";

const DEFAULT_KEY = "square-maker-0";

function App() {
  const [squareData, setSquareData] = useSessionStorage<SquareData>(
    DEFAULT_KEY,
    generateEmptySquareData,
  );
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [zoneFromWhichActiveIdComesFrom, setZoneFromWhichActiveIdComesFrom] =
    useState<SquareDataKey | null>(null);

  return (
    <SquareEventContextProvider
      squareData={squareData}
      setSquareData={setSquareData}
    >
      <h1 className="title">Square maker</h1>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        autoScroll={false}
      >
        <Navbar />
        <SquareContent />
        {zoneFromWhichActiveIdComesFrom === "stagingArea" ? (
          <DragOverlay dropAnimation={null}>
            {typeof activeId === "string" ? (
              <DraggingImage imageUrl={activeId} />
            ) : null}
          </DragOverlay>
        ) : null}
      </DndContext>
    </SquareEventContextProvider>
  );

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    setZoneFromWhichActiveIdComesFrom(null);
    setSquareData((prev) => {
      if (event.over) {
        return generateSquareData(
          prev,
          event.active.id,
          event.over.id as SquareDataKey,
        );
      } else {
        return prev;
      }
    });
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
    if (typeof event.active.id === "string") {
      const zone = getKeyFromImageUrl(event.active.id, squareData);
      setZoneFromWhichActiveIdComesFrom(zone);
    }
  }
}

export default App;
