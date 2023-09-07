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

/**
 * @description 使用递归过滤掉需要在左侧菜单中呈现的菜单项(不包括带有isHide == true的菜单)。
 * @param {Array} menuList - 菜单列表
 * @returns {Array}
 */
export function getShowMenuList(menuList: RouteObjectType[]): RouteObjectType[] {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter(item => {
    if (item.children?.length) {
      item.children = getShowMenuList(item.children)
    }
    return !item.meta?.isHide
  })
}

/**
 * @description 获得第一级菜单
 * @param {RouteObjectType[]} menuList - 菜单列表
 * @returns {RouteObjectType[]}
 */
export function getFirstLevelMenuList(menuList: RouteObjectType[]): RouteObjectType[] {
  return menuList.map(item => ({
    ...item,
    children: undefined,
  }))
}

/**
 * @description 使用递归找到所有面包屑并将它们存储在redux中。
 * @param {Array} menuList - 菜单列表.
 * @param {Array} parent - 父级菜单
 * @param {Object} result - 处理后的结果
 * @returns {Object}
 */
export function getAllBreadcrumbList(
  menuList: RouteObjectType[],
  parent: RouteObjectType[] = [],
  result: Record<string, RouteObjectType[]> = {}
) {
  for (const menu of menuList) {
    result[menu.meta!.key!] = [...parent, menu]
    if (menu.children?.length) {
      // 有子元素，则继续处理
      getAllBreadcrumbList(menu.children, result[menu.meta!.key!], result)
    }
  }
  return result
}
