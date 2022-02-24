import isFunctionComponent from "./isFunctionComponent";
import mountElement from "./mountElement";

export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null
  let component = null

  // 判断组件是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)

    // 获取组件实例对象
    component = nextVirtualDOM.component
  }

  mountElement(nextVirtualDOM, container, oldDOM)

  if (component) {
    component.componentDidMount()

    if (component.props && component.props.ref) {
      component.props.ref(component)
    }
  }
}

function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent(virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {})
  const nextVirtualDOM = component.render()

  nextVirtualDOM.component = component

  return nextVirtualDOM
}