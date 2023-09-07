import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../interface'
import { getFlatMenuList, getShowMenuList } from '@/utils'

const authState: AuthState = {
  // 菜单权限列表
  authMenuList: [],
  // 按钮权限列表
  authButtonList: {},
  //菜单权限列表 ==> 左侧菜单栏呈现，需要移除isHide == true的菜单
  showMenuList: [],
  //菜单权限列表 ==> 扁平化一维数组菜单，主要用于添加动态路由
  flatMenuList: [],
}

const authSlice = createSlice({
  name: 'auth-store',
  initialState: authState,
  reducers: {
    setAuthMenuList(state, { payload }: PayloadAction<AuthState['authMenuList']>) {
      state.authMenuList = payload
      state.flatMenuList = getFlatMenuList(payload)
      state.showMenuList = getShowMenuList(payload)
    },
    setAuthButtonList(state, { payload }: PayloadAction<AuthState['authButtonList']>) {
      state.authButtonList = payload
    },
  },
})

export const { setAuthMenuList, setAuthButtonList } = authSlice.actions

export default authSlice.reducer
