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
    alert("Your workout has been saved!");
  };

  return (
    <div className="App">
      <ul className="nav nav-pills nav-justified flex-column flex-sm-row sticky-top bg-light">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Workouts">
            My Workouts
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Exercises">
            Exercise Library
          </a>
        </li>
      </ul>

      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <form onSubmit={(e) => handleSubmit(e)}>
              <br />
              <h2 className="text-center">Create a workout:</h2>
              <br />
              <div className="row mb-3">
                <label for="time" className="col-sm-5 col-form-label text-end">
                  Duration? (mins)
                </label>
                <div className="col-sm-7 ">
                  <input
                    className="form-control"
                    id="time"
                    placeholder="Minutes"
                    name="time"
                    value={time}
                    type="text"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  for="equipment"
                  className="col-sm-5 col-form-label text-end"
                >
                  Equipment avaliable?
                </label>
                <div className="col-sm-7 ">
                  <select
                    id="equipment"
                    className="form-select form-select-lg mb-3 col-sm-10"
                    name="equipment"
                    value={equipment}
                    onChange={handleInputChange}
                  >
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
                </div>
              </div>
              <div className="row mb-3">
                <label
                  for="bodyPart"
                  className="col-sm-5 col-form-label text-end"
                >
                  What do you want to train?
                </label>
                <div className="col-sm-7 ">
                  <select
                    id="bodyPart"
                    className="form-select form-select-lg mb-3 col-sm-10"
                    name="bodyPart"
                    value={bodyPart}
                    onChange={handleInputChange}
                  >
                    <option value="8">Upper Body</option>
                    <option value="9">Lower Body</option>
                    <option value="">Full Body</option>
                    <option value="10">Abs</option>
                  </select>
                  <button
                    className="btn btn-outline-primary d-grid gap-2 col-12 "
                    type="submit"
                  >
                    WORK ME OUT
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div class="col">
            {finalWorkout[0] && (
              <section className="container-fluid">
                <ul id="workoutParts" className="list-group">
                  {" "}
                  <br />
                  <h3 className="fw-light"> Workout: 12 reps x 3 sets</h3>
                  <br />
                  {finalWorkout.map((exercise) => (
                    <Link key={exercise.id} to={`/exerciseinfo/${exercise.id}`}>
                      <li className="list-group-item fw-bold bg-light">
                        {exercise["name"]}
                      </li>
                    </Link>
                  ))}{" "}
                </ul>
                <br />
                <button
                  className="btn btn-outline-success d-grid gap-2 col-12 "
                  onClick={() => saveWorkout(finalWorkout.id)}
                  type="submit"
                >
                  Save Workout
                </button>
              </section>
            )}
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
