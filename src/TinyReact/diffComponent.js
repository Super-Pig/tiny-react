import mountElement from "./mountElement"
import updateComponent from "./updateComponent"

/**
 * 
 * @param {*} virtualDOM 组件本身的 virtualDOM 对象，通过它可以获取到组件最新的 props
 * @param {*} oldComponent 需要更新的组件的实例对象；通过它可以调用组件的生命周期函数；可以更新组件的 props 属性；可以获取到组件返回的最新的 Virtual DOM
 * @param {*} oldDOM 要更新的 DOM 对象；在更新组件时，需要在已有 DOM 对象的身上进行修改；实现 DOM 最小化操作；获取旧的 Virtual DOM 对象
 * @param {*} container 如果要更新的组件和旧组件不是同一个对象，要直接将组件返回的 Virtual DOM 显示在页面中；此时需要 container 作为父容器
 */
export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) { 
  if(isSameComponent(virtualDOM, oldComponent)) {
    // 组件类型相同
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    // 组件类型不同，直接将组件显示在页面中
    mountElement(virtualDOM, container, oldDOM)
  }
}

function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && (virtualDOM.type === oldComponent.constructor)
}