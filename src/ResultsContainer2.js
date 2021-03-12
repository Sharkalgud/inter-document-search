import React, {useEffect, useRef} from 'react'
import Result2 from './Result2'

function ResultsContainer2(props) {
    const resultsRef = useRef(null);
    useEffect(() => {
        var nodes = resultsRef.current.querySelectorAll("mark");
        console.log(nodes.length);
        if(nodes.length > 0){
            nodes[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    return (
        <div ref={resultsRef}>
            {Object.entries(props.results).map(result => <Result2 result = {result}/>)}
        </div>
    );
}

export default ResultsContainer2
