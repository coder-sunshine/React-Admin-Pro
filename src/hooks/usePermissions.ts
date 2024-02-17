import { getAuthButtonListApi, getAuthMenuListApi } from '@/api/modules/login'
import { useAuthStore, useUserStore } from '@/stores'
import { notification } from '@/hooks/useMessage'

/**
 * @description  Use permissions hook
 */
const usePermissions = () => {
  const setToken = useUserStore(state => state.setToken)
  const setAuthMenuList = useAuthStore(state => state.setAuthMenuList)
  const setAuthButtonList = useAuthStore(state => state.setAuthButtonList)

  const initPermissions = async (token: string) => {
    if (token) {
      try {
        // 获取按钮权限
        const { data: buttonList } = await getAuthButtonListApi()
        setAuthButtonList(buttonList)

        // 获取菜单权限
        const { data: menuList } = await getAuthMenuListApi()
        setAuthMenuList(menuList)

        if (menuList.length === 0) {
          notification.warning({
            message: '无权限访问',
            description: '当前账号无任何菜单权限，请联系系统管理员！',
          })
          setToken('')
          return Promise.reject('No permission')
        }
      } catch (error) {
        // 当按钮或者菜单请求错误发生时，清除token
        setToken('')
        return Promise.reject(error)
      }
    }
  }
  return {
    initPermissions,
  }
}

export default usePermissions
