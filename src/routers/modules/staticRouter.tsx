import { Navigate } from 'react-router-dom'
import { Loading } from '@/components/Loading'
import { HOME_URL, LOGIN_URL } from '@/config'
import { RouteObjectType } from '@/routers/interface'
import Login from '@/views/login/index'
import Home from '@/views/home/index'
import RouterGuard from '../helper/RouterGuard'
/**
 * staticRouter
 */
export const staticRouter: RouteObjectType[] = [
  {
    path: '/',
    element: <Navigate to={HOME_URL} />,
  },
  {
    path: HOME_URL,
    element: <Home />,
    meta: {
      title: '首页',
    },
  },
  {
    path: LOGIN_URL,
    element: <Login />,
    meta: {
      title: '登录',
    },
  },

  // Set <Loading /> here first to prevent page refresh 404
  {
    path: '*',
    element: <Loading />,
  },
]

// 用高阶组件包装每个元素
export const wrappedStaticRouter = staticRouter.map(route => {
  return {
    ...route,
    element: <RouterGuard>{route.element}</RouterGuard>,
    loader: () => {
      return { ...route.meta }
    },
  }
})
