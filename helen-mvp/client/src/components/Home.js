import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Home() {
  let [workout, setWorkout] = useState({
    time: 0,
    equipment: "",
    bodyPart: "",
  });

  let [workoutParts, setWorkoutParts] = useState([]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setWorkout((workout) => ({ ...workout, [name]: value }));
  };

  const createWorkout = async (e) => {
    e.preventDefault();
    console.log(workout);
    try {
      const response = await fetch(
        `https://wger.de/api/v2/exercise/?language=2&category=${workout.bodyPart}&equipment=${workout.equipment}`
      );

      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setWorkoutParts(data.results);
      console.log(workoutParts);
    } catch (error) {
      console.log("error");
    }
  };

  const { time, equipment, bodyPart } = workout;

  return (
    <div className="App">
      <h1>Work Me Out</h1>
      <form onSubmit={createWorkout}>
        <h2>Create a workout:</h2>
        <br />
        Duration of workout? (mins)
        <br />
        <input
          placeholder="Minutes"
          name="time"
          value={time}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        Equipment avaliable?
        <br />
        <select name="equipment" value={equipment} onChange={handleInputChange}>
          <option value="1">Barbell</option>
          <option value="8">Bench</option>
          <option value="3">Dumbell</option>
          <option value="4">Mat</option>
          <option value="9">Incline Bench</option>
          <option value="10">Kettlebell</option>
          <option value="7">None- bodyweight</option>
          <option value="6">Pull-up Bar</option>
          <option value="5">Swiss Ball</option>
          <option value="2">SZ Bar</option>
        </select>
        <br />
        What do you want to train? (mins)
        <br />
        <select name="bodyPart" value={bodyPart} onChange={handleInputChange}>
          <option value="8">Upper Body</option>
          <option value="9">Lower Body</option>
          <option value="">Full Body</option>
          <option value="10">Abs</option>
        </select>
        <button type="submit">Work me out!</button>
      </form>
      <section>
        <ul id="workoutParts">
          {" "}
          Workout: 12 reps x 3 sets{" "}
          {workoutParts
            .sort(() => Math.random() - Math.random())
            .slice(0, workout.time / 10)
            .map((workoutPart) => (
              <Link key={workoutPart.id} to={`/exerciseinfo/${workoutPart.id}`}>
                <li>{workoutPart["name"]}</li>
              </Link>
            ))}{" "}
        </ul>
      </section>
      <Outlet />
    </div>
  );
}
