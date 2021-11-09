import "./App.css";
import React, { useState } from "react";

export default function App() {
  let [workout, setWorkout] = useState({
    time: 0,
    equipment: "",
    bodyPart: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setWorkout((workout) => ({ ...workout, [name]: value }));
  };

  const createWorkout = (e) => {
    e.preventDefault();
    console.log(workout);
  };

  const { time, equipment, bodyPart } = workout;
  return (
    <div className="App">
      <h1>Work Me Out</h1>
      <form onSubmit={createWorkout}>
        Create a workout:
        <input
          placeholder="Minutes"
          name="time"
          value={time}
          type="text"
          onChange={handleInputChange}
        />
        <select name="equipment" value={equipment} onChange={handleInputChange}>
          <option value="barbell">Barbell</option>
          <option value="bench">Bench</option>
          <option value="dumbell">Dumbell</option>
          <option value="mat">Mat</option>
          <option value="inclineBench">Incline Bench</option>
          <option value="kettlebell">Kettlebell</option>
          <option value="none">None- bodyweight</option>
          <option value="pullupBar">Pull-up Bar</option>
          <option value="swissBall">Swiss Ball</option>
          <option value="szBar">SZ Bar</option>
        </select>
        <select name="bodyPart" value={bodyPart} onChange={handleInputChange}>
          <option value="upperBody">Upper Body</option>
          <option value="lowerBody">Lower Body</option>
          <option value="fullBody">Full Body</option>
          <option value="core">Abs</option>
        </select>
        <button type="submit">Work me out!</button>
      </form>
    </div>
  );
}
