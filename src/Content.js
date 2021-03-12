import React from "react"
import {Tab} from 'react-bootstrap'

function Content(props) {
    return (
        <Tab.Content>
            {Object.entries(props.results).map(
                result =>
                <Tab.Pane eventKey={result[0]}>
                    <p>{result[1]}</p>
                </Tab.Pane>
            )}
        </Tab.Content>
    );
}

export default Content
