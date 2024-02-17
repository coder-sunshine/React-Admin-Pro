import { AuthAction, AuthState } from '@/stores/interface'
import { getFlatMenuList, getShowMenuList } from '@/utils'
import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

export type AuthStoreState = AuthState & AuthAction

export const useAuthStore = create<AuthStoreState>()(
  immer(set => ({
    // 菜单权限列表
    authMenuList: [],
    // 按钮权限列表
    authButtonList: {},
    //菜单权限列表 ==> 左侧菜单栏呈现，需要移除isHide == true的菜单
    showMenuList: [],
    //菜单权限列表 ==> 扁平化一维数组菜单，主要用于添加动态路由
    flatMenuList: [],
    setAuthButtonList: authButtonList =>
      set((state: AuthState) => {
        state.authButtonList = authButtonList
      }),
    setAuthMenuList: authMenuList =>
      set((state: AuthState) => {
        state.authMenuList = authMenuList
        state.flatMenuList = getFlatMenuList(authMenuList)
        state.showMenuList = getShowMenuList(authMenuList)
      }),
  }))
)
