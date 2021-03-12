import React, {useEffect, useRef, useState} from 'react'
import Mark from "mark.js"

function Result2(props){
    const textRef = useRef(null);
    const [textShowing, setTextShowing] = useState(true)

    useEffect(() => {
        var markInstance = new Mark(textRef.current);
        markInstance.unmark({
              done: () => {
                markInstance.markRanges(props.result[1]["results"]);
              }
        });
    });

    const toggleText = () => {
        if(textShowing){
            textRef.current.style.display = '';
        } else {
            textRef.current.style.display = 'none';
        }
        setTextShowing(!textShowing);
    };

    return (
        <div>
            <h1 onClick={toggleText}>{props.result[0]}</h1>
            <p ref={textRef}>{props.result[1]["text"]}</p>
        </div>
    );
}

export default Result2
