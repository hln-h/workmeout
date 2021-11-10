import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ExerciseInfo() {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getData = async () => {
    const response = await fetch(`https://wger.de/api/v2/exerciseinfo/${id}`);
    const data = await response.json();
    setData(data);
  };
  // ​
  useEffect(() => {
    console.log("hi");
    getData();
  }, [id]);

  return (
    <div>
      {" "}
      <h3>{data.name}</h3>
      How to:
      <br />
      <div dangerouslySetInnerHTML={{ __html: data.description }} />
    </div>
  );
}
