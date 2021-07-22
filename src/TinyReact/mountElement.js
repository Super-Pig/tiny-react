import isFunction from "./isFunction"
import mountComponent from "./mountComponent"
import mountNativeElement from "./mountNativeElement"

export default function mountElement(virtualDOM, container, oldDOM) {
  if(isFunction(virtualDOM)) {
    // 类组件 or 函数组件
    mountComponent(virtualDOM, container, oldDOM)
  } else {
    mountNativeElement(virtualDOM, container, oldDOM)
  }
}