import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            pasta: []
        }
        this.create = this.create.bind(this)
    }
    async componentDidMount() {
        const pasta = (await axios.get('/api/pasta')).data
        this.setState({ pasta })
    }
    async create() {
        const pasti = (await axios.post('/api/pasta')).data
        const pasta = [...this.state.pasta, pasti]
        this.setState({ pasta })
        console.log(pasta)
    }
    render() {
        const pasta = this.state.pasta;
        return (
            <div>
                <h1>Sunsweet's Pasta Recommendations</h1>
                <button onClick={ this.create }>City Loading</button>
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