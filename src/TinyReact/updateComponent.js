import diff from "./diff"

export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
  // 更新前的 props 和 state
  let prevProps = oldComponent.props
  let prevState = oldComponent.state

  oldComponent.componentWillReceiveProps(virtualDOM.props)

  if (oldComponent.shouldComponentUpdate(virtualDOM.props, virtualDOM.state)) {
    oldComponent.componentWillUpdate(virtualDOM.props, virtualDOM.state)

    // 更新属性
    oldComponent.updateProps(virtualDOM.props)

    // 获取最新的 virtualDOM
    let nextVirtualDOM = oldComponent.render()

    // 更新 component 组件实例对象
    nextVirtualDOM.component = oldComponent

    // 比对
    diff(nextVirtualDOM, container, oldDOM)

    oldComponent.componentDidUpdate(prevProps, prevState)
  }
}