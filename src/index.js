import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            pasta: []
        }
    }
    async componentDidMount() {
        const pasta = (await axios.get('/api/pasta')).data
        this.setState({ pasta })
    }
    render() {
        const pasta = this.state.pasta;
        return (
            <div>
                <h1>Sunsweet's Pasta Recommendations</h1>
                <div>
                    {
                        pasta.map( pasti => {
                            return (
                                <p>
                                    { pasti.name }
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))