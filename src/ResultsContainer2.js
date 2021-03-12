import React, {useEffect, useRef, useState} from 'react'
import Result2 from './Result2'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'

function ResultsContainer2(props) {
    const resultsRef = useRef(null);
    const [resultCount, setResultCount] = useState(0);

    const moveForward = () => {
        var nodes = resultsRef.current.querySelectorAll("mark");
        if(nodes.length > 0){
            setResultCount(resultCount === nodes.length - 1 ? 0: resultCount + 1);
            nodes[resultCount].scrollIntoView({ behavior: 'smooth', block: 'center' });
            nodes[resultCount].style.display = '';
        }
    }

    const moveBackwards = () => {
        var nodes = resultsRef.current.querySelectorAll("mark");
        if(nodes.length > 0){
            setResultCount(resultCount === 0 ? nodes.length - 1 : resultCount - 1);
            nodes[resultCount].scrollIntoView({ behavior: 'smooth', block: 'center' });
            nodes[resultCount].style.display = '';
        }
    }

    const getResultCount = () => {
        var count = 0
        for(var key in props.results){
            count += props.results[key]['results'].length;
        }
        return count;
    };

    return (
        <div>
            <Navbar bg='light' fixed="bottom">
                <h3 style={{paddingRight: '3vh'}}>{'Result ' + (resultCount + 1) + ' of ' + getResultCount()}</h3>
                <Button variant="outline-secondary" onClick={moveForward}>Next</Button>
                <Button variant="outline-secondary" onClick={moveBackwards}>Previous</Button>
            </Navbar>
            <div style={{paddingLeft: '10vh', paddingRight: '10vh'}} ref={resultsRef}>
                {Object.entries(props.results).map(result => <Result2 result = {result}/>)}
            </div>
        </div>
    );
}

export default ResultsContainer2
