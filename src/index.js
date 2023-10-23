import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login/Login";
import Profile from "./component/Profile/Profile";
import bg from "./img/3383078.jpg"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="bg-cover bg-center bg-no-repeat h-[930px] xl:h-[1100px] bg-fixed " style={{backgroundImage:`url(${bg})`}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile/:mail" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
);
