import React from 'react'
import Result from './Result'

function ResultsContainer(props) {
    return (
        <div>
            {Object.entries(props.results).map(result => <Result result = {result}/>)}
        </div>
    );
}

export default ResultsContainer
