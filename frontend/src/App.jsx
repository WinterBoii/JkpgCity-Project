import { Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../lib/utils/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
        <Route path="/stores" element={<h1>Hello Store</h1>} />
        <Route path="/wellness" element={<h1>Hello Wellness</h1>} />
        <Route path="/login" element={<LoginPage  />} />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
