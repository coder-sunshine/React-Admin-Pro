import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../interface'

const authState: AuthState = {
  // 菜单权限列表
  authMenuList: [],
  // 按钮权限列表
  authButtonList: {},
}

const authSlice = createSlice({
  name: 'auth-store',
  initialState: authState,
  reducers: {
    setAuthMenuList(state, { payload }: PayloadAction<AuthState['authMenuList']>) {
      state.authMenuList = payload
    },
    setAuthButtonList(state, { payload }: PayloadAction<AuthState['authButtonList']>) {
      state.authButtonList = payload
    },
  },
})

export const { setAuthMenuList, setAuthButtonList } = authSlice.actions

export default authSlice.reducer
