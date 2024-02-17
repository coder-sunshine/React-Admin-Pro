import axios from 'axios'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/components/Loading/fullScreen'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ResultEnum } from '@/enums/httpEnum'
import { message } from '@/hooks/useMessage'
import { LOGIN_URL } from '@/config'
import { checkStatus } from './helper/checkStatus'
import { ResultData } from './interface'
import { useUserStore } from '@/stores'

// 拓展 AxiosRequestConfig 接口
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
}

const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 创建实例
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的 token,存储到 redux/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { noLoading: true } 来控制
        config.loading && showFullScreenLoading()
        if (config.headers && typeof config.headers.set === 'function') {
          const token = useUserStore.getState().token
          config.headers.set('x-access-token', token)
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        tryHideFullScreenLoading()
        if (data.code === ResultEnum.OVERDUE) {
          // token过期
          useUserStore.getState().setToken('')
          message.error(data.msg)
          // 跳转到登录页面
          window.$navigate(LOGIN_URL)
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.msg)
          return Promise.reject(data)
        }
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        tryHideFullScreenLoading()
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf('timeout') !== -1) message.error('请求超时！请您稍后重试')
        if (error.message.indexOf('Network Error') !== -1) message.error('网络错误！请您稍后重试')
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status)
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) window.$navigate('/500')
        return Promise.reject(error)
      }
    )
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' })
  }
}

export default new RequestHttp(config)
