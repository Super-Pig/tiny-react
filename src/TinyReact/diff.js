import mountElement from "./mountElement";
import mountComponent from "./mountComponent";
import isFunction from "./isFunction";

export default function diff(virtualDOM, container, oldDOM) {
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else {

  }
}