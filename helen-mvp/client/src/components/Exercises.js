import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Exercises() {
  const [exerciseName, setExerciseName] = useState([]);

  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = async (e) => {
    try {
      const response = await fetch(
        `https://wger.de/api/v2/exercise/?language=2`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data);
      setExerciseName(data.results);
    } catch (error) {
      console.log("error");
    }
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
          <a class="nav-link " href="/Workouts">
            My Workouts
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/Exercises">
            Exercise Library
          </a>
        </li>
      </ul>
      {/* <Link to={`/`}>
        {" "}
        <h1>Home</h1>{" "}
      </Link>{" "} */}
      <ul class="list-group" id="exerciseData">
        {exerciseName.map((data) => (
          <li class="list-group-item" key={data.id}>
            <div class="fw-bold">{data["name"]}:</div>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
