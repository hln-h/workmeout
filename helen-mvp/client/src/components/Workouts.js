import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Workouts() {
  const [displayedWorkout, setDisplayedWorkout] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  // const [displayedDetails, setDisplayedDetails] = useState([]);
  // const [data, setData] = [];

  useEffect(() => {
    showSavedWorkouts();
  }, []);

  const showSavedWorkouts = async () => {
    try {
      const res = await fetch("/workouts");
      const data = await res.json();
      console.log(data);
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
  // const makeDisplayed = (clickedWorkout) => {
  //   if (displayedWorkout && clickedWorkout === displayedWorkout.id)
  //     setDisplayedWorkout(null);
  //   else setDisplayedWorkout(clickedWorkout);
  //   // getDisplayData();
  // };

  // const getDisplayData = () => {
  //   fetch(`/workouts/${displayedWorkout.id}`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setDisplayedDetails(json);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   callApi();
  // };

  // const callApi=async()=>{
  //   displayedDetails.exerciseApiIds.splice(",")
  //   .map(element) => (
  //     const res = await fetch(`https://wger.de/api/v2/exerciseinfo/${element}`);
  //    const data = await response.json();
  //    setData(data.results);
  // } catch (error) {
  //   console.log("error");
  // })}

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
      <Link to={`/`}>
        {" "}
        <h1>Home</h1>{" "}
      </Link>{" "}
      <ul id="savedWorkouts">
        {" "}
        Saved workouts:{" "}
        {workoutList.map((workout) => (
          <li key={workout.id}>
            Workout: {workout.time} minutes {""}{" "}
            {bodyPartToString(workout.bodyPart)} with{" "}
            {equipmentToString(workout.equipment)} {""}
            <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Displayed workout:
      {displayedWorkout && data.description} */}
    </div>
  );
}

{
}
// onClick={() => makeDisplayed(item)}
