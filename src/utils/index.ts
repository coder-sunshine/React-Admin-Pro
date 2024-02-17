import { ResPage } from '@/api/interface'
import { useAuthStore } from '@/stores'
import { RouteObjectType } from '@/routers/interface'
import { RequestData } from '@ant-design/pro-components'

const mode = import.meta.env.VITE_ROUTER_MODE

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

/**
 * @description Convert a 3-digit HEX color code to a 6-digit code.
 * @returns {String}
 */
export function convertToSixDigitHexColor(str: string) {
  if (str.length > 4) return str.toLocaleUpperCase()
  else return (str[0] + str[1] + str[1] + str[2] + str[2] + str[3] + str[3]).toLocaleUpperCase()
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

/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage
  let defaultBrowserLang = ''
  if (['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase())) defaultBrowserLang = 'zh'
  else defaultBrowserLang = 'en'
  return defaultBrowserLang
}

/**
 * @description 获取需要展开的子菜单键。
 * @param {String} path - 当前 path
 * @returns {Array}
 */
export function getOpenKeys(path: string): string[] {
  let currentKey: string = ''
  let openKeys: string[] = []
  let pathSegments: string[] = path.split('/').map((segment: string) => '/' + segment)
  for (let i: number = 1; i < pathSegments.length - 1; i++) {
    currentKey += pathSegments[i]
    openKeys.push(currentKey)
  }
  return openKeys
}

/**
 * @description 用params获取相对url
 * @returns {String}
 */
export function getUrlWithParams() {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search,
  }
  return url[mode]
}

/**
 * @description 获取一个带有路径的菜单对象
 * @param {Array} menulist - 要搜索的菜单对象列表。
 * @param {string} path - 与菜单对象的路径相匹配的路径。
 * @returns {Object} 匹配的菜单对象，如果没有找到匹配，则为空。
 */
export function getMenuByPath(
  menulist: RouteObjectType[] = useAuthStore.getState().flatMenuList,
  path: string = getUrlWithParams()
) {
  const menuItem = menulist.find(menu => {
    // 匹配通过规则的动态路由
    const regex = new RegExp(`^${menu.path?.replace(/:.[^/]*/, '.*')}$`)
    return regex.test(path)
  })
  return menuItem || {}
}

/**
 * @description 格式化服务器为ProTable组件返回的数据。
 * @param {Object} data - 服务器返回的数据。
 * @returns {Object}
 */
export function formatDataForProTable<T>(data: ResPage<T>): Partial<RequestData<T>> {
  return {
    success: true,
    data: data.list,
    total: data.total,
  }
}
