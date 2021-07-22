import createDOMElement from "./createDOMElement"

/**
 * 渲染普通节点
 * @param {*} virtualDOM 
 * @param {*} container 
 * @param {*} oldDOM
 */
export default function mountNativeElement(virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM)
  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement)
  }
  
  if (oldDOM) {
    container.replaceChild(newElement, oldDOM)
  } else {
    container.appendChild(newElement)
  }
}