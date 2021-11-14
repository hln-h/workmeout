import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Workouts() {
  const [displayedWorkout, setDisplayedWorkout] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  // const [displayedDetails, setDisplayedDetails] = useState([]);
  // const [data, setData] = [];

  useEffect(() => {
    showSavedWorkouts();
  }, [workoutList]);

  const showSavedWorkouts = async () => {
    try {
      const res = await fetch("/workouts");
      const data = res.json();
      setWorkoutList(data);
    } catch (error) {
      console.log(error);
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

  //   const deleteWorkout = () => {
  //     fetch(`/workouts/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((json) => setWorkoutList(json));
  //   };

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
            {workout.time} ,{workout.equipment} ,{workout.bodyPart}
          </li>
        ))}
      </ul>
      {/* Displayed workout:
      {displayedWorkout && data.description} */}
    </div>
  );
}

{
  /* <button onClick={() => deleteWorkout(workoutListItem.id)}>
     Delete
</button> */
}
// onClick={() => makeDisplayed(item)}
