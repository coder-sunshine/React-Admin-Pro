import { useUserStore, useAuthStore } from '@/stores'
import { useEffect } from 'react'
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom'
import { MetaProps } from '../interface'
import { HOME_URL, LOGIN_URL, ROUTER_WHITE_LIST } from '@/config'

/**
 * @description 路由守卫组件
 */
interface RouterGuardProps {
  children: React.ReactNode
}

// 做路由守卫处理 例如登录验证等，传入children，返回验证过后的children
const RouterGuard: React.FC<RouterGuardProps> = props => {
  // 提供了从路由loader返回的值
  const loader = useLoaderData()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  //挂载导航以提供非React函数组件或自定义React Hook函数调用
  window.$navigate = navigate

  const token = useUserStore(state => state.token)
  const authMenuList = useAuthStore(state => state.authMenuList)

  useEffect(() => {
    const meta = loader as MetaProps
    if (meta) {
      const title = import.meta.env.VITE_GLOB_APP_TITLE
      document.title = meta.title ? `${meta.title} - ${title}` : title
    }

    // 白名单
    if (ROUTER_WHITE_LIST.includes(pathname)) return

    const isLoginPage = pathname === LOGIN_URL

    // 如果在访问的页面上有菜单数据、令牌、去登录页面，则重定向到主页
    if (authMenuList.length && token && isLoginPage) {
      return navigate(HOME_URL)
    }

    // 如果没有菜单数据，没有令牌&&所访问的页面不是登录页面，重定向到登录页面
    if ((!token && !isLoginPage) || (!authMenuList.length && !token && !isLoginPage)) {
      return navigate(LOGIN_URL, { replace: true })
    }
  }, [loader])

  return props.children as JSX.Element
}

export default RouterGuard
