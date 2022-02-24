import TinyReact from "../TinyReact"

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

TinyReact.render(<Alert name='garry' age={33} />, document.getElementById('root'))
