import http from '@/api'
import { ResLogin, ReqLogin } from '../interface'
import { PORT1 } from '../config/servicePort'

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: ReqLogin) => {
  return http.post<ResLogin>(PORT1 + `/login`, params, { noLoading: true })
}
