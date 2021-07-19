import mountElement from "./mountElement"

/**
 * 渲染普通元素
 * @param {*} virtualDOM 
 * @param {*} container 
 */
export default function mountNativeElement(virtualDOM, container) {
  const { type, children, props } = virtualDOM

  if (type === 'text') {
    // 文本节点
    container.appendChild(document.createTextNode(props.textContent))
  } else {
    // 元素节点
    const newElement = document.createElement(virtualDOM.type)

    Object.entries(props).forEach(([propName, value]) => {
      if (propName !== 'children') {
        if (propName === 'className') {
          // class 属性
          newElement.setAttribute('class', value)
        } else if (propName.slice(0, 2) === 'on') {
          // 事件绑定
          newElement.addEventListener(propName.slice(2).toLowerCase(), value)
        } else {
          newElement.setAttribute(propName, value)
        }
      }
    })

    children.map(child => mountElement(child, newElement))
 
    container.appendChild(newElement)
  }
}