import mountElement from "./mountElement"
import unmountNode from './unmountNode'

export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) { 
  if(isSameComponent(virtualDOM, oldComponent)) {
    // 组件类型相同
  } else {
    // 组件类型不同
    unmountNode(oldDOM)
    mountElement(virtualDOM, container)
  }
}

function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && (virtualDOM.type === oldComponent.constructor)
}