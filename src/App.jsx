import { BrowserRouter, Route, Routes } from "react-router-dom"
import NQueen from "./pages/NQueen"

function App() {

  return (
    <BrowserRouter basename="/NQueensVisualizer/">
      <Routes>
        <Route path="/" element={<NQueen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
