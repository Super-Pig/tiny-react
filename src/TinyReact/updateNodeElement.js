export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM) {
  const newProps = virtualDOM.props || {}
  const oldProps = (oldVirtualDOM && oldVirtualDOM.props) || {}

  Object.keys(newProps).forEach(propName => {
    const newPropValue = newProps[propName]
    const oldPropValue = oldProps[propName]

    if (newPropValue !== oldPropValue) {
      if (propName === 'className') {
        // class 属性
        newElement.setAttribute('class', newPropValue)
      } else if (propName.slice(0, 2) === 'on') {
        // 事件绑定
        const eventName = propName.slice(2).toLowerCase()
        newElement.removeEventListener(eventName, oldPropValue)
        newElement.addEventListener(eventName, newPropValue)
      } else if (propName === 'value' || propName === 'checked') {
        newElement[propName] = newPropValue
      } else if (propName !== 'children') {
        newElement.setAttribute(propName, newPropValue)
      }
    }
  })

  // 删除属性
  Object.keys(oldProps).forEach(propName => {
    if (!newProps[propName]) {
      if (propName === 'className') {
        newElement.removeAttribute('class')
      } else if (propName.slice(0, 2) === 'on') {
        // 删除事件绑定
        const eventName = propName.slice(2).toLowerCase()
        newElement.removeEventListener(propName, oldProps[propName])
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  })
}