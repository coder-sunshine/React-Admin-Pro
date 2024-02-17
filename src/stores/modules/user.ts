import { UserAction, UserState } from '@/stores/interface'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'

export type UserStoreState = UserState & UserAction

export const useUserStore = create<UserStoreState>()(
  immer(
    persist(
      set => ({
        token: '',
        userInfo: { name: 'test' },
        setToken: token =>
          set((state: UserState) => {
            state.token = token
          }),
        setUserInfo: userInfo =>
          set((state: UserState) => {
            state.userInfo = userInfo
          }),
      }),
      {
        name: 'user',
        version: 1.0,
      }
    )
  )
)
