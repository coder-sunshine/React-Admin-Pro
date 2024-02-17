import { TabsState, TabsAction } from '@/stores/interface'
import { getUrlWithParams } from '@/utils'
import { createWithEqualityFn } from 'zustand/traditional'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

export type TabsStoreState = TabsState & TabsAction

export const useTabsStore = createWithEqualityFn<TabsStoreState>()(
  immer(
    persist(
      set => ({
        tabsList: [],
        setTabsList: tabsList =>
          set((draft: TabsState) => {
            draft.tabsList = tabsList
          }),
        addTab: tabs =>
          set((draft: TabsState) => {
            if (draft.tabsList.every(item => item.path !== tabs.path)) {
              draft.tabsList.push(tabs)
            }
          }),
        removeTab: (path, isCurrent) =>
          set((draft: TabsState) => {
            if (!draft.tabsList.find(item => item.path === path)?.closable) return
            if (isCurrent) {
              draft.tabsList.forEach((item, index) => {
                if (item.path !== path) return
                const nextTab = draft.tabsList[index + 1] || draft.tabsList[index - 1]
                if (!nextTab) return
                window.$navigate(nextTab.path)
              })
            }
            draft.tabsList = draft.tabsList.filter(item => item.path !== path)
          }),
        closeTabsOnSide: (path, type) =>
          set((draft: TabsState) => {
            const currentIndex = draft.tabsList.findIndex(item => item.path === path)
            if (currentIndex !== -1) {
              const range = type === 'left' ? [0, currentIndex] : [currentIndex + 1, draft.tabsList.length]
              draft.tabsList = draft.tabsList.filter((item, index) => {
                return index < range[0] || index >= range[1] || !item.closable
              })
            }
          }),
        closeMultipleTab: path =>
          set((draft: TabsState) => {
            draft.tabsList = draft.tabsList.filter(item => {
              return item.path === path || !item.closable
            })
          }),
        setTabTitle: title =>
          set((draft: TabsState) => {
            draft.tabsList = draft.tabsList.map(item => {
              if (item.path == getUrlWithParams()) {
                return { ...item, title: title }
              }
              return item
            })
          }),
      }),
      {
        name: 'tabs',
        version: 1.0,
      }
    )
  ),
  shallow
)
