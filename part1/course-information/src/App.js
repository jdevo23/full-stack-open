import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;
const Total = ({ exercises }) => (
  <p>Number of exercises {exercises.reduce((acc, curr) => (acc += curr))}</p>
);
const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);
const Content = ({ parts }) => (
  <div>
    {parts.map(({ part, exercises }) => (
      <Part part={part} exercises={exercises} />
    ))}
  </div>
);

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[
          { part: part1, exercises: exercises1 },
          { part: part2, exercises: exercises2 },
          { part: part3, exercises: exercises3 },
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
