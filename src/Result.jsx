import React, {Component} from 'react'

class Result extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.result[0]}</h1>
                {this.props.result[1].map(sentence => (<p>{sentence}</p>))}
            </div>
        )
    }
}

export default Result
