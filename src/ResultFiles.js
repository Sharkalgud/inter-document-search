import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav} from 'react-bootstrap'

function ResultFiles(props) {
    return (
        <Nav variant="pills" className="flex-column">
            {Object.entries(props.results).map(
                result =>
                <Nav.Item>
                    <Nav.Link eventKey={result[0]}>{result[0]}</Nav.Link>
                </Nav.Item>
            )}
        </Nav>
    );
}

export default ResultFiles
