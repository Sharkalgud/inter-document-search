import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ResultsContainer2 from './ResultsContainer2';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function App() {
  const [results2, setResults2] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchHistory, setSearchHistory] = useState({'history':[]});
  const [searchConfidence, setSearchConfidence] = useState('medium');

  const search = useCallback(async() => {
    if(isSearching) return
    setIsSearching(true)
    fetch('/search2?term=' + searchTerm +'&mode=hebbia' + '&clevel=' + searchConfidence).then(res => res.json()).then(data => {
      setResults2(data);
      setIsSearching(false);
      setSearchHistory({'history': [searchTerm].concat(searchHistory['history'])});
    });
  }, [isSearching, searchTerm, searchConfidence]);

  const fileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
    .post("/upload", formData)
    .then(res => console.log(res))
    .catch(err => console.warn(err));
  }

  return (
    <div style = {{paddingTop: '3vh', paddingBottom: '10vh'}}>
      <div>
      <Navbar bg='light'fixed="top">
        <InputGroup>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              Upload File
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Form onSubmit={fileUpload}>
                <Form.Group>
                  <Form.Control as = 'input' type = 'file' onChange={(e) => {setSelectedFile(e.target.files[0])}}/>
                  <Button variant="outline-secondary" type="submit">Upload</Button>
                </Form.Group>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control type = 'text' value = {searchTerm} onChange = {e => setSearchTerm(e.target.value)} placeholder = 'Search for anything'/>
          <InputGroup.Append>
            <Dropdown as={ButtonGroup}>
              <Button variant="outline-secondary" disabled={isSearching} onClick={search}>
                {isSearching ? 'Searching...' : (searchConfidence === "medium" ? 'Search' : (searchConfidence === "low" ? 'Low Confidence Search' : 'High Confidence Search'))}
              </Button>
              <Dropdown.Toggle split variant="outline-secondary" />
              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>{setSearchConfidence("low")}}>Low Confidence Search</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setSearchConfidence("medium")}}>Normal Search</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setSearchConfidence("high")}}>High Confidence Search</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown drop="left">
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Search History
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {searchHistory['history'].map(term => <Dropdown.Item onClick={(e) => {setSearchTerm(term)}}>{term}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
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
