import { Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/stores" element={<h1>Hello Store</h1>} />
      <Route path="/wellness" element={<h1>Hello Wellness</h1>} />
      <Route path="/login" element={<LoginPage  />} />
      <Route path="*" element={<h1>Error 404</h1>} />
    </Routes>
  )
}

export default App
