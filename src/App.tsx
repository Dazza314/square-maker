import "./App.css"
import Navbar from "./components/Navbar"
import SquareContent from "./components/square/SquareContent"

function App() {

  return (
    <>
      <h1 className="title">Square maker</h1>
      <Navbar />
      <SquareContent />
    </>
  )
}

export default App
