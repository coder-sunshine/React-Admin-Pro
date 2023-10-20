import { getFlatMenuList } from '@/utils'
import { RouteObjectType } from '../interface'
import { Navigate } from 'react-router-dom'
import LazyComponent from '@/components/Lazy'
import { lazy } from 'react'
import RouterGuard from './RouterGuard'
// import LayoutIndex from '@/layouts'
import LayoutIndexAsync from '@/layouts/indexAsync'

// 导入views目录中的所有视图文件 --> Parameters 获取参数类型
const modules = import.meta.glob('@/views/**/*.tsx') as Record<string, Parameters<typeof lazy>[number]>

/**
 * @description 将menuList转换为react-router所需的格式
 * @param {Array} authMenuList 权限菜单列表
 * @returns {Array} react-router所要求的路由格式
 */
export const convertToDynamicRouterFormat = (authMenuList: RouteObjectType[]) => {
  // 扁平化路由
  const flatMenuList = getFlatMenuList(authMenuList)

  const handleMenuList = flatMenuList.map(item => {
    // 需要把 children 删除，因为已经是扁平化路由了
    if (item.redirect) delete item.children

    // 处理重定向
    if (item.redirect) item.element = <Navigate to={item.redirect} />

    // 转化 element 为 antd 组件
    if (item.element && typeof item.element === 'string') {
      // 匹配组件
      const Component = LazyComponent(lazy(modules['/src/views' + item.element + '.tsx']))
      // 包裹路由守卫
      item.element = <RouterGuard>{Component}</RouterGuard>
    }

    // 设置 loader
    item.loader = () => {
      return { ...item.meta, redirect: !!item.redirect }
    }
    return item
  })

  // const dynamicRouter: RouteObjectType[] = [{ element: <LayoutIndex />, children: [] }]
  const dynamicRouter: RouteObjectType[] = [{ element: <LayoutIndexAsync />, children: [] }]

  handleMenuList.forEach(item => {
    if (item.meta?.isFull) {
      dynamicRouter.push(item)
    } else {
      dynamicRouter[0].children?.push(item)
    }
  })

  return dynamicRouter
}
