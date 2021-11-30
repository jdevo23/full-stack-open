import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const handleNextAnecdoteClick = () => {
    const numAnecdotes = anecdotes.length;
    setSelected(Math.floor(Math.random() * numAnecdotes));
  };

  const handleVote = () => {
    const arrCopy = [...points];
    arrCopy[selected] += 1;
    setPoints(arrCopy);
  };

  const returnHighestRankedAnecdote = () => {
    const sortedArr = [...points].sort((a, b) => b - a);
    const index = points.indexOf(sortedArr[0]);
    const total = points[index];

    return {
      index,
      total,
    };
  };

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <button onClick={() => handleVote()}>vote</button>
        <button onClick={() => handleNextAnecdoteClick()}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        <p>{anecdotes[returnHighestRankedAnecdote().index]}</p>
        <p>has {returnHighestRankedAnecdote().total} votes</p>
      </div>
    </div>
  );
};

export default App;
