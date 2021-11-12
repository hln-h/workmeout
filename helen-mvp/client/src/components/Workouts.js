import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Workouts() {
  const [displayedWorkout, setDisplayedWorkout] = useState([]);

  const makeDisplayed = (workout) => {
    if (displayedWorkout && workout.id === displayedWorkout.id)
      setDisplayedWorkout(null);
    else setDisplayedWorkout(workout);
  };

  return (
    <div>
      <Link to={`/`}>
        {" "}
        <h1>Home</h1>{" "}
      </Link>{" "}
      saved workouts
    </div>
  );
}
