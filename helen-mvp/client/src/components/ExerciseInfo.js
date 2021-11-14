import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ExerciseInfo() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(true);

  const getData = async () => {
    const response = await fetch(`https://wger.de/api/v2/exerciseinfo/${id}`);
    const data = await response.json();
    setData(data);
    setDescription(data.description);
    console.log(data);
    data.images.length ? setImage(data.images[0].image) : setImage("");
  };
  // ​
  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      {" "}
      <button
        class="btn btn-outline-info d-grid gap-2 col-6 "
        onClick={() => setVisible(!visible)}
      >
        {visible ? "Hide info" : "Show info"}
      </button>
      {visible && (
        <div>
          <h3>{data.name}</h3>
          How to:
          <br />
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <section>{image && <img src={image} />}</section>
        </div>
      )}
    </div>
  );
}
