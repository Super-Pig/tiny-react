import TinyReact from "./TinyReact"

// const virtualDOM = (
//   <div className="container">
//     <h1>你好 Tiny React</h1>
//     <h2 data-test="test">(编码必杀技)</h2>
//     <div>
//       嵌套1 <div>嵌套1.1</div>
//     </div>
//     <h3>(观察：这个将会改变)</h3>
//     {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//     {2 == 2 && <div>2</div>}
//     <span>这是一段内容</span>
//     <button onClick={() => alert('你好')}>点击我</button>
//     <h3>这个将会删除</h3>
//     2,3
//     <input type='text' value='123' />
//   </div>
// )

// const modifyDOM = (
//   <div className="container">
//     <h1>你好 Tiny React</h1>
//     <h2 data-test="test123">(编码必杀技)</h2>
//     <div>
//       嵌套1 <div>嵌套1.1</div>
//     </div>
//     <h3>(观察：这个将会改变)</h3>
//     {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//     {2 == 2 && <div>2</div>}
//     <span>这是一段被修改过的内容</span>
//     <button onClick={() => alert('你好!!!!')}>点击我</button>
//     <input type='text' value='123' />
//   </div>
// )

// function Garry(props) {
//   return <div className={props.className}>
//     {props.title}
//     <Peng />
//   </div>
// }

// function Peng() {
//   return <h1>Peng</h1>
// }

class Garry extends TinyReact.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Default Title'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      title: 'New Title'
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

  render() {
    return <div className={this.props.className}>
      {this.props.title}

      <div>{this.state.title}</div>
      <div>
        <button onClick={this.handleClick}>改变 Title</button>
      </div>
    </div>
  }
}

// TinyReact.render(<Garry title='Garry' />, document.getElementById('root'))

// setTimeout(() => {
//   TinyReact.render(<Garry title='Peng' />, document.getElementById('root'))
//   // TinyReact.render(<Peng />, document.getElementById('root'))
// }, 2000)


class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log(this.input.value)
    console.log(this.garry)
  }

  render() {
    return <div>
      <input type='text' ref={input => { this.input = input }} />
      <button onClick={this.handleClick}>按钮</button>
      <Garry title='Garry' ref={garry => { this.garry = garry }} />
    </div>
  }
}

TinyReact.render(<DemoRef />, document.getElementById('root'))
