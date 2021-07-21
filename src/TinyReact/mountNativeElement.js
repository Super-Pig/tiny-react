import createDOMElement from "./createDOMElement"

/**
 * 渲染普通节点
 * @param {*} virtualDOM 
 * @param {*} container 
 */
export default function mountNativeElement(virtualDOM, container) {
  const newElement = createDOMElement(virtualDOM)
  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement)
  }

  container.appendChild(newElement)
}