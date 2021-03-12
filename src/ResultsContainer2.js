import React, {useEffect, useRef, useState} from 'react'
import Result2 from './Result2'
import Button from 'react-bootstrap/Button';

function ResultsContainer2(props) {
    const resultsRef = useRef(null);
    const [resultCount, setResultCount] = useState(0);
    // useEffect(() => {
    //     var nodes = resultsRef.current.querySelectorAll("mark");
    //     console.log(nodes.length);
    //     if(nodes.length > 0){
    //         nodes[resultCount].scrollIntoView({ behavior: 'smooth', block: 'center' });
    //     }
    // });

    const moveForward = () => {
        var nodes = resultsRef.current.querySelectorAll("mark");
        if(nodes.length > 0){
            setResultCount(resultCount === nodes.length - 1 ? 0: resultCount + 1);
            nodes[resultCount].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const moveBackwards = () => {
        var nodes = resultsRef.current.querySelectorAll("mark");
        if(nodes.length > 0){
            setResultCount(resultCount === 0 ? nodes.length - 1 : resultCount - 1);
            nodes[resultCount].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return (
        <div>
            <Button variant="outline-secondary" onClick={moveForward}>Next</Button>
            <Button variant="outline-secondary" onClick={moveBackwards}>Previous</Button>
            <div style={{paddingLeft: '10vh', paddingRight: '10vh'}} ref={resultsRef}>
                {Object.entries(props.results).map(result => <Result2 result = {result}/>)}
            </div>
        </div>
    );
}

export default ResultsContainer2
