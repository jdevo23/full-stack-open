import React from "react";

const PersonForm = ({ handleSubmit, newPerson, updateNewPerson }) => (
  <form onSubmit={(e) => handleSubmit(e)}>
    <div>
      name:{" "}
      <input
        onChange={(e) =>
          updateNewPerson({ name: "name", value: e.target.value })
        }
        value={newPerson.name}
      />
    </div>
    <div>
      number:{" "}
      <input
        onChange={(e) =>
          updateNewPerson({ name: "number", value: e.target.value })
        }
        value={newPerson.number}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
