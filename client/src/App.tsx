import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sign" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
