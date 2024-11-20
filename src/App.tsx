import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DraggingImage from "./components/square/DraggingImage";
import SquareContent from "./components/square/SquareContent";
import { SquareEventHandler } from "./components/square/SquareEventHandler";
import {
  generateSquareData,
  getKeyFromImageUrl,
} from "./components/square/squareUtils";
import SquareDataContext from "./contexts/SquareDataContext";
import SquareDataContextProvider from "./contexts/SquareDataContextProvider";
import { SquareDataKey } from "./types";

function App() {
  return (
    <SquareDataContextProvider>
      <Dnd />
    </SquareDataContextProvider>
  );
}

function Dnd() {
  const { squareData, setSquareData } = useContext(SquareDataContext);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [zoneFromWhichActiveIdComesFrom, setZoneFromWhichActiveIdComesFrom] =
    useState<SquareDataKey | null>(null);

  return (
    <SquareEventHandler>
      <h1 className="title">Square maker</h1>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        autoScroll={false}
      >
        <Navbar />
        <SquareContent />
        {zoneFromWhichActiveIdComesFrom === "stagingArea"
          ? (
            <DragOverlay dropAnimation={null}>
              {typeof activeId === "string"
                ? <DraggingImage imageUrl={activeId} />
                : null}
            </DragOverlay>
          )
          : null}
      </DndContext>
    </SquareEventHandler>
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
