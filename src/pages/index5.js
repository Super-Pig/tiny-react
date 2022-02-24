import TinyReact from "../TinyReact";

class KeyDemo extends TinyReact.Component {
    constructor(props) {
        super(props)

        this.state = {
            persons: [{
                id: 1,
                name: 'jim'
            }, {
                id: 2,
                name: 'green'
            }, {
                id: 3,
                name: 'lucy'
            }, {
                id: 4,
                name: 'garry'
            }]
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const newState = JSON.parse(JSON.stringify(this.state))
        // newState.persons.push(newState.persons.shift())
        newState.persons.splice(1, 0, { id: 5, name: 'lilei' })
        this.setState(newState)
    }

    render() {
        return <div>
            <ul>
                {
                    this.state.persons.map(({ id, name }) => <li key={id}>{name}</li>)
                }
            </ul>

            <button onClick={this.handleClick}>Click me</button>
        </div>
    }
}

TinyReact.render(<KeyDemo />, document.getElementById('root'))