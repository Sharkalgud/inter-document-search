import React, {Component} from 'react'
import Result from './Result'

class ResultsContainer extends Component {
    render() {
        return (
            <div>
                {Object.entries(this.props.results).map(result => <Result result = {result}/>)}
            </div>
        )
    }
}

export default ResultsContainer
