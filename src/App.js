import React, { useState, useEffect } from 'react';
import './App.css';
// import ResultsContainer from './ResultsContainer';
import ResultsContainer2 from './ResultsContainer2';
import Mark from "mark.js"

function App() {
  const [results, setResults] = useState({});
  const [results2, setResults2] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // fetch('/search?term=' + searchTerm).then(res => res.json()).then(data => {
    //   setResults(data);
    // }).then(() => {
    //   var markInstance = new Mark(document.querySelectorAll("#search-result"));
    //   markInstance.unmark({
    //   done: () => {
    //       markInstance.mark(searchTerm);
    //   }
    //   });
    // });
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
      {/* <ResultsContainer results = {results}/> */}
      <ResultsContainer2 results = {results2}/>
    </div>
  );
}

export default App;
