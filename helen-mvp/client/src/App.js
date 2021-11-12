import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ExerciseInfo from "./components/ExerciseInfo";
import Exercises from "./components/Exercises";
import Workouts from "./components/Workouts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="exerciseinfo/:id" element={<ExerciseInfo />} />
        </Route>
        <Route path="workouts" element={<Workouts />} />
        <Route path="exercises" element={<Exercises />} />
      </Routes>
    </BrowserRouter>
  );
}
