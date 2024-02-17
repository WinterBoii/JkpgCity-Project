import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@mui/material";
import { theme } from "./lib/utils/Theme";

/**
 * App component renders different routes based on react router.
 * It conditionally renders the NavBar component based on
 * the current route.
 * Provides ThemeProvider with custom theme.
 * Renders custom 404 page for unknown routes.
 */
function App() {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/*'] // Add more routes as needed to hide the navbar in

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {!hideOnRoutes.includes(location.pathname) && <NavBar />}
        {!hideOnRoutes.includes(location.pathname) && (
          <div style={{ height: "48px" }} />
        )}{""}
        {/* Adjust height as needed */}
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/stores" element={<h1>Hello Store</h1>} />
          <Route path="/wellness" element={<h1>Hello Wellness</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
