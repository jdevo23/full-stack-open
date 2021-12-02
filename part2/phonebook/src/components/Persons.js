import React from "react";

const Persons = ({ handleDelete, persons }) =>
  persons.map(({ id, name, number }, index) => (
    <div key={`${name}${index}`}>
      <p style={{ margin: 0 }}>
        {name} {number}
      </p>
      <button onClick={(e) => handleDelete(e, id, name)}>delete</button>
    </div>
  ));

export default Persons;
