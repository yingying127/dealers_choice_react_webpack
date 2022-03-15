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

        //this.state.tasks.push(task)
        // this.setState({ tasks: this.state.tasks })
    }
    render() {
        const pasta = this.state.pasta;
        // console.log(pasta)
        return (
            <div>
                <h1>Sunsweet's Pasta Recommendation in Random Cities</h1>
                <div>
                    {
                        pasta.map(pasti => {
                            return (
                                <p key={pasti.id} value={pasti}>
                                    { pasti.name }
                                </p>
                                
                            )
                        })
                    }
                    <button onClick={ this.create }>Click to Load Recommendations</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))