import { RouterProvider as Router, createHashRouter, createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import type { RouteObjectType } from './interface'
import { wrappedStaticRouter } from './modules/staticRouter'
import useMessage from '@/hooks/useMessage'

import { useState } from 'react'

const mode = import.meta.env.VITE_ROUTER_MODE

const RouterProvider: React.FC = () => {
  // 执行一次useMessage，注册message组件
  useMessage()
  const [routerList] = useState<RouteObjectType[]>(wrappedStaticRouter)
  const routerMode = {
    hash: () => createHashRouter(routerList as RouteObject[]),
    history: () => createBrowserRouter(routerList as RouteObject[]),
  }
  return <Router router={routerMode[mode]()} />
}

export default RouterProvider
