import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ActiveDecklist from "./pages/ActiveDecklist/ActiveDecklist";
import Header from "./Components/Header/Header";
import { useState } from "react";

function App() {

  const [loginState, setLoginState] = useState(false)

  const handleLogIn = () => {
    console.log("log in")
    setLoginState(true)
  }

  const handleLogOut = () => {
    console.log("log out")
    setLoginState(false)
  }

  return (
    <BrowserRouter>
      <Header loginState={loginState}/>
      <Routes>
        <Route path="/" element={<Dashboard handleLogOut={handleLogOut}/>} />
        <Route path="/login" element={<Login handleLogIn={handleLogIn}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/decklists/:decklistId" element={<ActiveDecklist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
