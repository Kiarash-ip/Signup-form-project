import React from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "./app.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
