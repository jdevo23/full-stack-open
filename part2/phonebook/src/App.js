import React, { useState, useEffect } from "react";
import { Filter, PersonForm, Persons, Notification } from "./components";
import { personService } from "./services";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notification, setNotification] = useState({
    error: false,
    message: null,
  });

  // get initial data
  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
      setFilteredPersons(persons);
    });
  }, []);

  // apply filter(s) to results
  useEffect(() => {
    let personsCopy = [...persons];

    if (filter.length > 0) {
      personsCopy = personsCopy.filter(({ name: { common } }) =>
        common.toLowerCase().includes(filter.toLowerCase())
      );
    }

    setFilteredPersons(personsCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, persons]);

  const updateNewPerson = ({ name, value }) => {
    const newObj = { ...newPerson };
    newObj[name] = value;
    setNewPerson(newObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((p) => p.name === newPerson.name);

    if (existingPerson !== undefined) {
      const result = window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (result) {
        const { id, name } = existingPerson;
        let newPersons = [...persons];

        personService
          .update(id, newPerson)
          .then((data) => {
            newPersons.splice(persons.indexOf(id), 1, data);
            setPersons(newPersons);
            setNewPerson({ name: "", number: "" });
            setNotification({
              error: false,
              message: `Updated ${name}`,
            });
          })
          .catch((err) => {
            setNewPerson({ name: "", number: "" });
            setPersons(newPersons.filter((n) => n.id !== id));
            setNotification({
              error: true,
              message: `${name} was already deleted from server`,
            });
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((data) => {
          setPersons([...persons, data]);
          setNewPerson({ name: "", number: "" });
          setNotification({
            error: false,
            message: `Created ${data.name}`,
          });
        })
        .catch((err) => setNotification({ error: true, message: err }));
    }

    setTimeout(() => {
      setNotification({ ...notification, message: null });
    }, 5000);
  };

  const handleDelete = (e, id, name) => {
    e.preventDefault();

    const result = window.confirm(`Are you sure you want to delete ${name}?`);

    if (result) {
      personService
        .remove(id)
        .then((data) => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotification({
            error: false,
            message: `Deleted ${name}`,
          });
        })
        .catch((err) => setNotification({ error: true, message: err }));

      setTimeout(() => {
        setNotification({ ...notification, message: null });
      }, 5000);
    }

    return;
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter setFilter={setFilter} />

      <h3>Add a new person</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newPerson={newPerson}
        updateNewPerson={updateNewPerson}
      />

      <h3>Numbers</h3>
      <Persons handleDelete={handleDelete} persons={filteredPersons} />
    </div>
  );
};

export default App;
