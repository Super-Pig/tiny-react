import mountElement from "./mountElement";
import mountComponent from "./mountComponent";
import isFunction from "./isFunction";

export default function diff(virtualDOM, container, oldDOM) {
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 类组件 or 函数组件
    mountElement(virtualDOM, container)
  } else {

  }
}