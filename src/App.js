import React, { useState, useEffect } from 'react';
import './App.css';
import ResultsContainer from './ResultsContainer';

function App() {
  const [results, setResults] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/search?term=' + searchTerm).then(res => res.json()).then(data => {
      setResults(data);
    });
  }, [searchTerm]);

  return (
    <div style = {{textAlign: 'center', paddingTop: '30vh'}}>
      <input type= 'text' value = {searchTerm} onChange = {e => setSearchTerm(e.target.value)} placeholder = 'Search for anything'/>
      <br></br>
      <ResultsContainer results = {results}/>
    </div>
  );
}

export default App;
