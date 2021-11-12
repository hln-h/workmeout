import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Home() {
  let initialState = { time: 0, equipment: "", bodyPart: "" };
  const [workout, setWorkout] = useState(initialState);

  let [workoutParts, setWorkoutParts] = useState([]);
  const { time, equipment, bodyPart } = workout;
  const [finalWorkout, setFinalWorkout] = useState([]);
  const [idString, setIdString] = useState("");

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setWorkout((workout) => ({ ...workout, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createWorkout();
  };

  const createWorkout = async (e) => {
    try {
      const response = await fetch(
        `https://wger.de/api/v2/exercise/?language=2&category=${workout.bodyPart}&equipment=${workout.equipment}`
      );

      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setWorkoutParts(data.results);
      randomiseWorkoutParts(data.results);
    } catch (error) {
      console.log("error");
    }
  };

  const randomiseWorkoutParts = (data) => {
    setFinalWorkout(
      data.sort(() => Math.random() - Math.random()).slice(0, workout.time / 10)
    );
    console.log(finalWorkout);
  };

  useEffect(() => {
    createIdString();
  }, [finalWorkout]);

  const createIdString = () => {
    let result = [];
    for (let value of finalWorkout) {
      result.push(value.id);
    }
    setIdString(result.join(","));
  };

  const saveWorkout = () => {
    fetch("/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bodyPart: bodyPart,
        time: time,
        equipment: equipment,
        exerciseApiIds: idString,
      }),
    })
      .then((res) => res.json())
      .then((json) => setWorkoutParts(json));
    setWorkout(initialState);
    setIdString("");
  };

  return (
    <div className="App">
      <Link to={`/`}>
        {" "}
        <h1>Work Me Out</h1>{" "}
      </Link>
      <Link to={`/Workouts`}>
        {" "}
        <h3>My Workouts</h3>{" "}
      </Link>
      <Link to={`/Exercises`}>
        {" "}
        <h3>Exercise Library</h3>{" "}
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
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
          <option defaultValue>Please choose</option>
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
        What do you want to train?
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
          {finalWorkout.map((exercise) => (
            <Link key={exercise.id} to={`/exerciseinfo/${exercise.id}`}>
              <li>{exercise["name"]}</li>
            </Link>
          ))}{" "}
        </ul>
      </section>
      <button onClick={() => saveWorkout(finalWorkout.id)} type="submit">
        Save Workout
      </button>
      <Outlet />
    </div>
  );
}
