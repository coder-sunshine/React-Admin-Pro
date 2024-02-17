import React, { useEffect } from 'react'
import { theme, ConfigProvider, App as AppProvider } from 'antd'
import { HappyProvider } from '@ant-design/happy-work-theme'
import { useGlobalStore } from '@/stores'
import { LanguageType } from '@/stores/interface'
import { getBrowserLang } from '@/utils'
import { I18nextProvider } from 'react-i18next'
import { RefreshProvider } from '@/context/Refresh'
import RouterProvider from '@/routers'
import i18n from '@/languages/index'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const App: React.FC = () => {
  const { isDark, primary, componentSize, compactAlgorithm, borderRadius, language, isHappy, setGlobalState } = useGlobalStore(
    state => ({
      isDark: state.isDark,
      primary: state.primary,
      componentSize: state.componentSize,
      compactAlgorithm: state.compactAlgorithm,
      borderRadius: state.borderRadius,
      language: state.language,
      isHappy: state.isHappy,
      setGlobalState: state.setGlobalState,
    })
  )

  // 初始化 主题 算法
  const algorithm = () => {
    const algorithmArr = isDark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm]
    // 是否开启紧凑算法 可以组合使用
    if (compactAlgorithm) algorithmArr.push(theme.compactAlgorithm)
    return algorithmArr
  }

  // init language
  const initLanguage = () => {
    const result = language ?? getBrowserLang()
    setGlobalState('language', result as LanguageType)
    i18n.changeLanguage(language as string)
    dayjs.locale(language === 'zh' ? 'zh-cn' : 'en')
  }

  useEffect(() => {
    initLanguage()
  }, [language])

  return (
    // ConfigProvider 全局化配置
    <ConfigProvider
      locale={language === 'zh' ? zhCN : enUS}
      componentSize={componentSize}
      autoInsertSpaceInButton={true}
      theme={{
        token: { colorPrimary: primary, borderRadius },
        algorithm: algorithm(),
      }}
    >
      <HappyProvider disabled={!isHappy}>
        <AppProvider>
          <I18nextProvider i18n={i18n}>
            <RefreshProvider>
              <RouterProvider />
            </RefreshProvider>
          </I18nextProvider>
        </AppProvider>
      </HappyProvider>
    </ConfigProvider>
  )
}

export default App
