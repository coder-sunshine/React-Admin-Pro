import { RouterProvider as Router, createHashRouter, createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import type { RouteObjectType } from './interface'
import { wrappedStaticRouter } from './modules/staticRouter'
import useMessage from '@/hooks/useMessage'

import { useEffect, useState } from 'react'
import NotFound from '@/components/Error/404'
import useTheme from '@/hooks/useTheme'
import { RootState, useSelector } from '@/redux'
import { convertToDynamicRouterFormat } from './helper/ConvertRouter'
import usePermissions from '@/hooks/usePermissions'

const mode = import.meta.env.VITE_ROUTER_MODE

const RouterProvider: React.FC = () => {
  useTheme()
  // 执行一次useMessage，注册message组件
  useMessage()

  const { initPermissions } = usePermissions()
  const token = useSelector((state: RootState) => state.user.token)
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList)

  const [routerList, setRouterList] = useState<RouteObjectType[]>(wrappedStaticRouter)

  useEffect(() => {
    // 当刷新页面时，没有菜单数据
    if (!authMenuList.length) {
      initPermissions(token)
      return
    }

    // 可以在此处理动态路由，添加到 allRouter 中
    const dynamicRouter = convertToDynamicRouterFormat(authMenuList)

    let allRouter = [...wrappedStaticRouter, ...dynamicRouter]
    // 为了防止404刷新页面，请在页面末尾添加*路由
    allRouter.forEach(item => item.path === '*' && (item.element = <NotFound />))

    setRouterList(allRouter)
  }, [authMenuList])

  const routerMode = {
    hash: () => createHashRouter(routerList as RouteObject[]),
    history: () => createBrowserRouter(routerList as RouteObject[]),
  }
  return <Router router={routerMode[mode]()} />
}

export default RouterProvider
