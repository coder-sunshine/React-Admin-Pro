import { RouteObjectType } from '@/routers/interface'
import type { SizeType } from 'antd/lib/config-provider/SizeContext'

export interface UserState {
  token: string
  userInfo: { name: string }
}

export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export type LanguageType = 'zh' | 'en' | null

export interface GlobalState {
  layout: LayoutType
  componentSize: SizeType
  compactAlgorithm: boolean
  borderRadius: number
  language: LanguageType
  maximize: boolean
  primary: string
  isDark: boolean
  isGrey: boolean
  isWeak: boolean
  isHappy: boolean
  menuSplit: boolean
  siderInverted: boolean
  headerInverted: boolean
  isCollapse: boolean
  accordion: boolean
  watermark: boolean
  breadcrumb: boolean
  breadcrumbIcon: boolean
  tabs: boolean
  tabsIcon: boolean
  tabsDrag: boolean
  footer: boolean
  themeDrawerVisible: boolean
}

export interface AuthState {
  authMenuList: RouteObjectType[]
  authButtonList: Record<string, string[]>
}
