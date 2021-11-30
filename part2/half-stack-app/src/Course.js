import React from "react";

const Course = ({ course: { name, parts } }) => {
  const sumTotal = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      <h1>{name}</h1>
      {parts.map(({ name: partName, exercises, id }) => (
        <p key={id}>
          {partName} {exercises}
        </p>
      ))}

      <p>
        <b>total of {sumTotal} exercises</b>
      </p>
    </div>
  );
};

export default Course;
