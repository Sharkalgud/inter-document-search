import React, {useEffect, useRef} from 'react'
import Mark from "mark.js"

function Result2(props){
    const textRef = useRef(null);

    useEffect(() => {
        var markInstance = new Mark(textRef.current);
        markInstance.unmark({
              done: () => {
                markInstance.markRanges(props.result[1]["results"]);
              }
        });
    });

    return (
        <div>
            <h1>{props.result[0]}</h1>
            <p ref={textRef}>{props.result[1]["text"]}</p>
        </div>
    );
}

export default Result2
