import React, { useState, useEffect } from "react";
import axios from "axios";
import { Filter, PersonForm, Persons } from "./components";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const promise = axios.get("http://localhost:3001/persons");
    promise.then((res) => {
      setPersons(res.data);
    });
  }, []);

  const updateNewPerson = ({ name, value }) => {
    const newObj = { ...newPerson };
    newObj[name] = value;
    setNewPerson(newObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.map(({ name }) => name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    setPersons([...persons, newPerson]);
  };

  const filterResults = () => {
    const lowerFilter = filter.toLowerCase();
    let results = persons;

    if (filter.length > 0) {
      results = results.filter(({ name }) =>
        name.toLowerCase().includes(lowerFilter)
      );
    }

    return results;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />

      <h3>Add a new person</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        updateNewPerson={updateNewPerson}
      />

      <h3>Numbers</h3>
      <Persons filterResults={filterResults} />
    </div>
  );
};

export default App;
