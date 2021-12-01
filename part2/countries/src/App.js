import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Single } from './components';

const App = () => {
  const [results, setAllResults] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setAllResults(res.data));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let resultsCopy = [...results];

    if (filter.length > 0) {
      resultsCopy = resultsCopy.filter(({ name: { common } }) =>
        common.toLowerCase().includes(filter.toLowerCase())
      );
    }

    setFilteredResults(resultsCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const returnComponent = (filteredData) => {
    const { length } = filteredData;
    let component = null;

    if (length > 10) {
      component = <p>Too many matches, specify another filter</p>;
    }

    if (length > 1 && length < 10) {
      component = <List data={filteredData} />;
    }

    if (filteredData.length === 1) {
      component = <Single data={filteredData[0]} />;
    }

    return component;
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      find countries <input onChange={(e) => setFilter(e.target.value)} />
      {returnComponent(filteredResults)}
    </div>
  );
};

export default App;
