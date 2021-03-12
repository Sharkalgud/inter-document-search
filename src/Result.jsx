import React from 'react'

function Result(props){
    return (
        <div>
            <h1>{props.result[0]}</h1>
            {props.result[1].map(sentence => (<p id="search-result">{sentence}</p>))}
        </div>
    );
}

export default Result
