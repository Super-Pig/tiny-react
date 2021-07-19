import createDOMElement from "./createDOMElement"

/**
 * 渲染普通节点
 * @param {*} virtualDOM 
 * @param {*} container 
 */
export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM)

  container.appendChild(newElement)
}