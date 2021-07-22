import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement"

export default function createDOMElement(virtualDOM) {
  let newElement = null
  
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)

    updateNodeElement(newElement, virtualDOM)
  }

  // 将 virtualDOM 挂载到真实的 DOM 对象的属性中
  // 方便在对比时获取其 virtualDOM
  newElement._virtualDOM = virtualDOM

  virtualDOM.children.map(child => mountElement(child, newElement))

  if(virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }

  return newElement
}