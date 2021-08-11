/**
 * Author: TBY on 2021-08-11
 * note 笔记
 * tips 特别注意
 * example 例子
 */

export function setToken(type, value) {
  localStorage.setItem(type, value);
}
export function getToken(type) {
  return localStorage.getItem(type);
}
