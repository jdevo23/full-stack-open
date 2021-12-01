import React, { useState } from "react";
import Single from "./Single";

const List = ({ data }) => {
  const [singlesToDisplay, setSinglesToDisplay] = useState([]);

  const updateSinglesArray = (index) => {
    let newArr = [...singlesToDisplay];

    newArr.includes(index)
      ? newArr.splice(newArr.indexOf(index), 1)
      : newArr.push(index);

    setSinglesToDisplay(newArr);
  };

  return data.map((data, index) => (
    <div key={data.name.common}>
      <p>{data.name.common}</p>
      <button onClick={() => updateSinglesArray(index)}>show</button>
      {singlesToDisplay.includes(index) && <Single data={data} />}
    </div>
  ));
};

export default List;
