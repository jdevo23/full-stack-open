import React from "react";

const Single = ({
  data: {
    name: { common },
    capital: [capital],
    population,
    languages,
    flags,
  },
}) => {
  return (
    <>
      <h1>{common}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>

      <h3>languages</h3>
      <ul>
        {Object.values(languages).map((lang) => (
          <li>{lang}</li>
        ))}
      </ul>
      <img alt="flag" src={`${flags.png}`} />
    </>
  );
};

export default Single;
