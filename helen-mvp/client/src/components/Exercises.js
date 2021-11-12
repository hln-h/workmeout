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
      <Link to={`/`}>
        {" "}
        <h1>Home</h1>{" "}
      </Link>{" "}
      <ul id="exerciseData">
        {exerciseName.map((data) => (
          <li key={data.id}>
            {data["name"]}:{" "}
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
