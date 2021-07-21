import mountElement from "./mountElement";
import mountComponent from "./mountComponent";
import isFunction from "./isFunction";
import updateTextNode from "./updateTextNode";
import updateNodeElement from "./updateNodeElement";
import createDOMElement from "./createDOMElement";
import unmountNode from './unmountNode'
import diffComponent from "./diffComponent";

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (isFunction(virtualDOM)) {
    // 函数组件 or 类组件比对
    diffComponent(virtualDOM, oldVirtualDOM.component, oldDOM, container)
  } else if (oldVirtualDOM && oldVirtualDOM.type !== virtualDOM.type && !isFunction(virtualDOM)) {
    // 普通元素组件 && 组件类型不相同
    const newElement = createDOMElement(virtualDOM)

    // 新节点替换旧节点
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (oldVirtualDOM && oldVirtualDOM.type === virtualDOM.type) {
    // 新旧 virtualDOM 类型相同
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
      oldDOM._virtualDOM = virtualDOM
    }

    // 比对子节点
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })

    // 删除节点
    const oldChildNodes = oldDOM.childNodes

    if (oldChildNodes.length > virtualDOM.children.length) {
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i])
      }
    }
  }
}