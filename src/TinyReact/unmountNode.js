export default function numountNode(node) {
  // 获取节点的 virtualDOM 对象
  const virtualDOM = node._virtualDOM

  // 1. 文本节点可以直接删除
  if (virtualDOM.type === 'text') {
    // 删除节点
    return node.remove()
  }

  // 2. 元素节点
  const component = virtualDOM.component

  // 如果 component 存在，就说明节点是由组件生成的
  if (component) {
    component.componentWillUnmount()
  }

  // 3. 节点身上是否有 ref 属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }

  // 4. 看一下节点的属性中是否有事件属性
  Object.entries(virtualDOM.props || {}).forEach(([propName, value]) => {
    if (propName.slice(0, 2) === 'on') {
      // 解除事件绑定
      const eventName = propName.toLowerCase().slice(2)
      node.removeEventListener(eventName, value)
    }
  })

  // 5. 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      numountNode(node.childNodes[i])
      i--
    }
  }

  // 删除节点
  node.remove()
}