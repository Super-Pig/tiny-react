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
  } else if (oldVirtualDOM && oldVirtualDOM.type !== virtualDOM.type) {
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

    // 1. 将拥有 key 属性的子元素放置在一个单独的对象中
    const keyedElements = {}

    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      const domElement = oldDOM.childNodes[i]

      if (domElement.nodeType === 1) {
        // 元素节点
        const key = domElement.getAttribute('key')

        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    // 更新子节点
    virtualDOM.children.forEach((child, i) => {
      const key = child.props.key

      if (key !== undefined) {
        const domElement = keyedElements[key]

        if (domElement) {
          if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
            oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
          }

          diff(child, oldDOM, oldDOM.childNodes[i])
        } else {
          // 新增元素
          mountElement(child, oldDOM, oldDOM.childNodes[i])
        }
      } else {
        diff(child, oldDOM, oldDOM.childNodes[i])
      }
    })

    // 删除节点
    const oldChildNodes = oldDOM.childNodes

    if (oldChildNodes.length > virtualDOM.children.length) {
      // 通过 key 属性删除节点
      for (let i = 0; i < oldChildNodes.length; i++) {
        let oldChild = oldChildNodes[i]
        let oldChildKey = oldChild._virtualDOM.props.key
        let found = false

        for (let n = 0; n < virtualDOM.children.length; n++) {
          if (oldChildKey === virtualDOM.children[n].props.key) {
            found = true
            break
          }
        }

        if (!found) {
          unmountNode(oldChild)
          i--
        }
      }

      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i])
      }

      // if (hasNoKey) {
      //   // 通过索引删除节点
      //   for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
      //     unmountNode(oldChildNodes[i])
      //   }
      // } else {
      //   // 通过 key 属性删除节点
      //   for (let i = 0; i < oldChildNodes.length; i++) {
      //     let oldChild = oldChildNodes[i]
      //     let oldChildKey = oldChild._virtualDOM.props.key
      //     let found = false

      //     for (let n = 0; n < virtualDOM.children.length; n++) {
      //       if (oldChildKey === virtualDOM.children[n].props.key) {
      //         found = true
      //         break
      //       }
      //     }

      //     if (!found) {
      //       unmountNode(oldChild)
      //       i--
      //     }
      //   }

      //   for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
      //     unmountNode(oldChildNodes[i])
      //   }
      // }
    }
  }
}