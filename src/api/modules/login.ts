import http from '@/api'
import { ResLogin, ReqLogin } from '../interface'
import { PORT1 } from '../config/servicePort'
import { AuthState } from '@/stores/interface'

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: ReqLogin) => {
  return http.post<ResLogin>(PORT1 + `/login`, params, { noLoading: true })
}

// 获取按钮权限
export const getAuthButtonListApi = () => {
  return http.get<AuthState['authButtonList']>(PORT1 + `/auth/buttons`)
}

// 获取菜单权限
export const getAuthMenuListApi = () => {
  return http.get<AuthState['authMenuList']>(PORT1 + `/menu/list`)
}

// 退出登录
export const logoutApi = () => {
  return http.post(PORT1 + `/logout`, {}, { loading: true })
}
