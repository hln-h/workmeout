import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ExerciseInfo from "./components/ExerciseInfo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="exerciseinfo/:id" element={<ExerciseInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
