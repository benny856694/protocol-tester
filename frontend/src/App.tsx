
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {


  return (
    <BrowserRouter>
      <div className=" bg-gray-700 h-screen text-white">

      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
