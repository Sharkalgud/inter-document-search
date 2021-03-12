import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ResultsContainer2 from './ResultsContainer2';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [results2, setResults2] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // useEffect(() => {
  //   fetch('/search2?term=' + searchTerm +'&mode=hebbia').then(res => res.json()).then(data => {
  //     setResults2(data);
  //   });
  // }, [searchTerm]);

  const search = useCallback(async() => {
    if(isSearching) return
    setIsSearching(true)
    fetch('/search2?term=' + searchTerm +'&mode=hebbia').then(res => res.json()).then(data => {
      setResults2(data);
      setIsSearching(false);
    });
  }, [isSearching, searchTerm]);

  return (
    <div style = {{paddingTop: '5vh'}}>
      <div>
      <Navbar bg='light'fixed="top">
        <InputGroup>
          <Form.Control type = 'text' value = {searchTerm} onChange = {e => setSearchTerm(e.target.value)} placeholder = 'Search for anything'/>
          <InputGroup.Append>
            <Button variant="outline-secondary" disabled={isSearching} onClick={search}>Search</Button>
            <Button variant="outline-secondary">Previous</Button>
            <Button variant="outline-secondary">Next</Button>
          </InputGroup.Append>
        </InputGroup>
      </Navbar>
      </div>
      <br></br>
      <ResultsContainer2 results = {results2}/>
    </div>
  );
}

export default App;
