import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Tab, Row, Nav, Col} from 'react-bootstrap'
import Content from './Content'

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
                        <Content results = {props.results}/>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default ResultsContainer
