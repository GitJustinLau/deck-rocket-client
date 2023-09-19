import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';

import ActiveDecklist from "./pages/ctiveDecklist2/ActiveDecklist.jsx";
import Header from "./Components/Header/Header";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ActiveDecklist />} />
        <Route path="/decklists/:decklistId" element={<ActiveDecklist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
