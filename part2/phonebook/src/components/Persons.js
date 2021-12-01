import React from "react";

const Persons = ({ filterResults }) => {
  return filterResults().map(({ name, number }, index) => (
    <p key={`${name}${index}`} style={{ margin: 0 }}>
      {name} {number}
    </p>
  ));
};

export default Persons;
