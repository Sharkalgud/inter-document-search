import React from 'react'
import Result2 from './Result2'

function ResultsContainer2(props) {
    return (
        <div>
            {Object.entries(props.results).map(result => <Result2 result = {result}/>)}
        </div>
    );
}

export default ResultsContainer2
