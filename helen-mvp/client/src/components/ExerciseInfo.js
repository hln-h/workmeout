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
      <div className="container-fluid">
        <br />
        <button
          class="btn btn-outline-info float-end  d-grid gap-2 col-3 "
          onClick={() => setVisible(!visible)}
        >
          {visible ? "Hide info" : "Show info"}
        </button>

        {visible && (
          <div>
            <h6 className="fw-bold  ">{data.name}</h6>
            <br />
            How to:
            <div
              className="fw-light fst-italic"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {image && (
              <img
                src={image}
                className="rounded float-end float-end img-thumbnail d-grid col-5  "
                alt="..."
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
