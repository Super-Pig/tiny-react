import mountElement from "./mountElement";
import mountComponent from "./mountComponent";
import isFunction from "./isFunction";
import updateTextNode from "./updateTextNode";
import updateNodeElement from "./updateNodeElement";

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
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

    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })
  }
}