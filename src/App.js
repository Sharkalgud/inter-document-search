import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetch('/search2?term=' + searchTerm).then(res => res.json()).then(data => {
      setResults2(data);
    });
  }, [searchTerm]);

  return (
    <div style = {{paddingTop: '5vh'}}>
      <div>
      <Navbar bg='light'fixed="top">
        <InputGroup>
          <Form.Control type = 'text' value = {searchTerm} onChange = {e => setSearchTerm(e.target.value)} placeholder = 'Search for anything'/>
          <InputGroup.Append>
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
