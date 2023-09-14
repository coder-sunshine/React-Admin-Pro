import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TabsListProp, TabsState } from '../interface'

const tabsState: TabsState = {
  tabsList: [],
}

const tabsSlice = createSlice({
  name: 'tabs-store',
  initialState: tabsState,
  reducers: {
    setTabsList(state, { payload }: PayloadAction<TabsState['tabsList']>) {
      state.tabsList = payload
    },
    addTab(state, { payload }: PayloadAction<TabsListProp>) {
      if (state.tabsList.every(item => item.path === payload.path)) {
        state.tabsList.push(payload)
      }
    },
  },
})

export const { setTabsList, addTab } = tabsSlice.actions

export default tabsSlice.reducer
