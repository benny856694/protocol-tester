
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {


  return (
    <BrowserRouter>
      <div className="  h-screen flex flex-col">
      <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>

      </div>
      <div className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      </div>
      </div>
    </BrowserRouter>
  )
}

export default App
