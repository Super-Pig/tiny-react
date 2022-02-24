import TinyReact from "../TinyReact";
class Alert extends TinyReact.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Default Title'
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            title: 'Changed Title'
        })
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillReceiveProps(nextProps) {
        console.log(`componentWillReceiveProps - ${JSON.stringify(nextProps)}`)
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(`componentWillUpdate - ${JSON.stringify(nextProps)}`)
    }

    componentDidUpdate(prevProps, preState) {
        console.log(`componentDidUpdate - ${JSON.stringify(prevProps)}`)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    render() {
        return <div>
            <p>{this.props.name}</p>
            <p>{this.props.age}</p>

            <h1>
                {this.state.title}
            </h1>

            <button onClick={this.handleClick}>change title</button>
        </div>
    }
}


class DemoRef extends TinyReact.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log(this.input.value)
        console.log(this.alert)
    }

    render() {
        return <div>
            <input type='text' ref={input => this.input = input} />
            <button onClick={this.handleClick}>click me</button>
            <Alert ref={alert => this.alert = alert} name='garry' age={33} />
        </div>
    }
}

TinyReact.render(<DemoRef />, document.getElementById('root'))