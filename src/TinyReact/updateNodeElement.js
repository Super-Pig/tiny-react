export default function updateNodeElement(newElement, virtualDOM) {
  Object.entries(virtualDOM.props).forEach(([propName, value]) => {
    if (propName !== 'children') {
      if (propName === 'className') {
        // class 属性
        newElement.setAttribute('class', value)
      } else if (propName.slice(0, 2) === 'on') {
        // 事件绑定
        newElement.addEventListener(propName.slice(2).toLowerCase(), value)
      } else if (propName === 'value' || propName === 'checked') {
        newElement[propName] = value
      } else {
        newElement.setAttribute(propName, value)
      }
    }
  })
}