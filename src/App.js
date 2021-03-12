import React, { useState, useEffect } from 'react';
import './App.css';
import ResultsContainer2 from './ResultsContainer2';

function App() {
  const [results2, setResults2] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/search2?term=' + searchTerm).then(res => res.json()).then(data => {
      setResults2(data);
    });
  }, [searchTerm]);

  return (
    <div style = {{paddingTop: '30vh'}}>
      <div style = {{textAlign: 'center'}}>
        <input type= 'text' value = {searchTerm} onChange = {e => setSearchTerm(e.target.value)} placeholder = 'Search for anything'/>
      </div>
      <br></br>
      <ResultsContainer2 results = {results2}/>
    </div>
  );
}

export default App;
