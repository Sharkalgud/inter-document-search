import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Tab, Row, Nav, Col} from 'react-bootstrap'
import Content from './Content'
import ResultFiles from './ResultFiles'

function ResultsContainer(props) {
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                        <ResultFiles results= {props.results}/>
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
