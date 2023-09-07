import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../interface'

const userState: UserState = {
  token: '',
  userInfo: {
    name: 'Hooks',
  },
}

const userSlice = createSlice({
  name: 'user-store',
  initialState: userState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload
    },
    setUserInfo(state, { payload }: PayloadAction<UserState['userInfo']>) {
      state.userInfo = payload
    },
  },
})

export const { setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer
