import React, { useState, useEffect } from "react";
import {} from "react-router-dom";

export default function Exercises() {
  const [exerciseName, setExerciseName] = useState([]);
  const [visible, setVisible] = useState(false);

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
      <ul className="nav nav-pills nav-justified flex-column flex-sm-row sticky-top bg-light">
        <li className="nav-item">
          <a className="nav-link" className="nav-link" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/Workouts">
            My Workouts
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/Exercises">
            Exercise Library
          </a>
        </li>
      </ul>

      <section className="container-fluid">
        <br />
        <h2 className="text-left">Exercise library</h2>
        <br />
        <ul className="list-group" id="exerciseData">
          {exerciseName.map((data) => (
            <li className="list-group-item bg-light" key={data.id}>
              <div className="fw-bold">{data["name"]}</div>
              <button
                class="btn btn-outline-info float-end  d-grid gap-2 col-2  "
                onClick={() => setVisible(!visible)}
              >
                {visible ? "Hide info" : "Show info"}
              </button>
              {visible && (
                <div
                  className="fw-light"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
