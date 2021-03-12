import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Tab, Row, Nav, Col} from 'react-bootstrap'

function ResultsContainer(props) {
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        {Object.entries(props.results).map(
                            result =>
                            <Nav.Item>
                                <Nav.Link eventKey={result[0]}>{result[0]}</Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        {Object.entries(props.results).map(
                            result =>
                            <Tab.Pane eventKey={result[0]}>
                                <p>{result[1]}</p>
                            </Tab.Pane>
                        )}
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default ResultsContainer
