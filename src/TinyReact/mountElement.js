import isFunction from "./isFunction"
import mountComponent from "./mountComponent"
import mountNativeElement from "./mountNativeElement"

export default function mountElement(virtualDOM, container) {
  if(isFunction(virtualDOM)) {
    // 类组件 or 函数组件
    mountComponent(virtualDOM, container)
  } else {
    mountNativeElement(virtualDOM, container)
  }
}