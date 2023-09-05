import { RouteObjectType } from '@/routers/interface'

/**
 * @description 获取当前时间对应的问候语
 * @returns {String}
 */
export function getTimeState() {
  let timeNow = new Date()
  let hours = timeNow.getHours()
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`
  if (hours >= 10 && hours <= 14) return `中午好 🌞`
  if (hours >= 14 && hours <= 18) return `下午好 🌞`
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`
}

/**
 * @description 设置样式属性
 * @param {String} key - The key name of the style property
 * @param {String} val - The value of the style attribute
 */
export function setStyleProperty(key: string, val: string) {
  document.documentElement.style.setProperty(key, val)
}

export function getFlatMenuList(menuList: RouteObjectType[]): RouteObjectType[] {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}
