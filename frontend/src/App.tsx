
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Test from "./pages/Test";

function App() {


  return (
    <BrowserRouter>
      <div className="  h-screen flex flex-col">
      <div>
      </div>
      <div className="flex-1">
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} />
      </Routes>

      </div>
      </div>
    </BrowserRouter>
  )
}

export default App
