import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ActiveDecklist from "./pages/ActiveDecklist/ActiveDecklist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/decklist/:id" element={<ActiveDecklist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
