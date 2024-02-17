import { useEffect } from 'react'
import { theme } from 'antd'
import { setStyleProperty } from '@/utils'
import { getLightColor, getDarkColor } from '@/utils/color'
import { useGlobalStore } from '@/stores'
import globalTheme from '@/styles/theme/global'
import siderTheme from '@/styles/theme/sider'
import headerTheme from '@/styles/theme/header'

type ThemeType = 'light' | 'inverted' | 'dark'

const useTheme = () => {
  // token 里面是预设css变量
  const { token } = theme.useToken()

  const { isDark, primary, isGrey, isWeak, compactAlgorithm, borderRadius, siderInverted, headerInverted } = useGlobalStore(
    state => ({
      isDark: state.isDark,
      primary: state.primary,
      isGrey: state.isGrey,
      isWeak: state.isWeak,
      compactAlgorithm: state.compactAlgorithm,
      borderRadius: state.borderRadius,
      siderInverted: state.siderInverted,
      headerInverted: state.headerInverted,
    })
  )

  // 切换暗黑模式
  useEffect(() => switchDark(), [isDark])
  const switchDark = () => {
    const html = document.documentElement
    html.setAttribute('class', isDark ? 'dark' : '')
    changePrimary()
  }

  /**
   * @description 切换主题颜色
   */
  useEffect(() => changePrimary(), [primary, borderRadius, compactAlgorithm])
  const changePrimary = () => {
    const type: ThemeType = isDark ? 'dark' : 'light'
    // 自定义的 less 变量
    Object.entries(globalTheme[type]).forEach(([key, val]) => setStyleProperty(key, val))
    // antd less 变量
    Object.entries(token).forEach(([key, val]) => setStyleProperty(`--hooks-${key}`, val))
    // antd primaryColor less variable
    for (let i = 1; i <= 9; i++) {
      setStyleProperty(
        `--hooks-colorPrimary${i}`,
        isDark ? `${getDarkColor(primary, i / 10)}` : `${getLightColor(primary, i / 10)}`
      )
    }
  }

  /**
   * @description 切换 色弱 和 灰阶 模式
   */
  useEffect(() => changeGreyOrWeak(), [isGrey, isWeak])
  const changeGreyOrWeak = () => {
    const html = document.documentElement
    html.style.filter = isWeak ? 'invert(80%)' : isGrey ? 'grayscale(1)' : ''
  }

  /**
   * @description 切换 sider 主题
   */
  useEffect(() => changeSiderTheme(), [isDark, siderInverted])
  const changeSiderTheme = () => {
    const type: ThemeType = isDark ? 'dark' : siderInverted ? 'inverted' : 'light'
    Object.entries(siderTheme[type]).forEach(([key, val]) => setStyleProperty(key, val))
  }

  /**
   * @description 切换 header 主题
   */
  useEffect(() => changeHeaderTheme(), [isDark, headerInverted])
  const changeHeaderTheme = () => {
    const type: ThemeType = isDark ? 'dark' : headerInverted ? 'inverted' : 'light'
    Object.entries(headerTheme[type]).forEach(([key, val]) => setStyleProperty(key, val))
  }
}

export default useTheme
