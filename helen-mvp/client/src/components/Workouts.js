import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Workouts() {
  const [displayedWorkout, setDisplayedWorkout] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  const [displayedDetails, setDisplayedDetails] = useState([]);

  useEffect(() => {
    showSavedWorkouts();
  }, [displayedWorkout]);

  const showSavedWorkouts = async () => {
    try {
      const res = await fetch("/workouts");
      const data = await res.json();
      setWorkoutList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const bodyPartToString = (bodyPart) => {
    if (bodyPart === "9") {
      return "Lower body";
    } else if (bodyPart === "8") {
      return "Upper body";
    } else if (bodyPart === "10") {
      return "Abs";
    } else {
      return "Full body";
    }
  };

  const equipmentToString = (equipment) => {
    if (equipment === "1") {
      return "Barbell";
    } else if (equipment === "8") {
      return "Bench";
    } else if (equipment === "3") {
      return "Dumbell";
    } else if (equipment === "4") {
      return "Mat";
    } else if (equipment === "9") {
      return "Incline Bench";
    } else if (equipment === "10") {
      return "Kettlebell";
    } else if (equipment === "7") {
      return "None- bodyweight";
    } else if (equipment === "6") {
      return "Pull-up Bar";
    } else if (equipment === "5") {
      return "Swiss Ball";
    } else if (equipment === "2") {
      return "SZ Bar";
    }
  };

  const makeDisplayed = async (workout) => {
    await setDisplayedWorkout(workout);
    callApi();
    console.log(displayedWorkout);
  };

  const callApi = async () => {
    const ids = displayedWorkout.exerciseApiIds?.split(",") || [];
    // const results =[]
    // try {
    //   for await (const id of ids) {
    //     const response = await fetch(
    //       `https://wger.de/api/v2/exerciseinfo/${id}`
    //       // `https://wger.de/api/v2/exerciseinfo/112`
    //     );
    //     const json = await response.json();
    //     console.log("json", json);
    //   }

    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const promises = ids.map((id) =>
        fetch(`https://wger.de/api/v2/exerciseinfo/${id}`).then((res) =>
          res.json()
        )
      );
      const results = await Promise.all(promises);
      console.log(results);
      setDisplayedDetails(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi();
  }, [displayedWorkout]);

  const deleteWorkout = (id) => {
    fetch(`/workouts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setWorkoutList(json));
  };

  return (
    <div>
      <ul class="nav nav-pills nav-justified flex-column flex-sm-row">
        <li class="nav-item">
          <a class="nav-link" class="nav-link" href="/">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active " aria-current="page" href="/Workouts">
            My Workouts
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="/Exercises">
            Exercise Library
          </a>
        </li>
      </ul>
      {/* <Link to={`/`}>
        {" "}
        <h1>Home</h1>{" "}
      </Link>{" "} */}
      <ul id="savedWorkouts">
        {" "}
        Saved workouts:{" "}
        {workoutList.map((workout) => (
          <li key={workout.id} onClick={() => makeDisplayed(workout)}>
            Workout: {workout.time} minutes {""}{" "}
            {bodyPartToString(workout.bodyPart)} with{" "}
            {equipmentToString(workout.equipment)} {""}
            <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
          </li>
        ))}
      </ul>
      Displayed workout:
      <ul class="list-group" id="exerciseData">
        {displayedDetails.map((data) => (
          <li class="list-group-item" key={data.id}>
            <div class="fw-bold">{data["name"]}:</div>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </li>
        ))}
      </ul>
      {}
    </div>
  );
}
