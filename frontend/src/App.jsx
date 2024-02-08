import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/stores" element={<h1>Hello Store</h1>} />
      <Route path="/wellness" element={<h1>Hello Wellness</h1>} />
      <Route path="/login" element={<h1>Hello Login</h1>} />
      <Route path="*" element={<h1>Error 404</h1>} />
    </Routes>
  )
}

export default App
