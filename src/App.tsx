import { App as AppProvider, theme, ConfigProvider } from 'antd'
import { HappyProvider } from '@ant-design/happy-work-theme'
import RouterProvider from '@/routers'
import { useSelector } from 'react-redux'
import { RootState, useDispatch } from './redux'
import { RefreshProvider } from '@/context/Refresh'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/languages/index'
import { getBrowserLang } from './utils'
import { setGlobalState } from './redux/modules/global'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { LanguageType } from './redux/interface'

const App: React.FC = () => {
  const dispatch = useDispatch()

  const { isDark, isHappy, compactAlgorithm, primary, borderRadius, componentSize, language } = useSelector(
    (state: RootState) => state.global
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
    dispatch(setGlobalState({ key: 'language', value: result as LanguageType }))
    i18n.changeLanguage(language as string)
    dayjs.locale(language === 'zh' ? 'zh-cn' : 'en')
  }

  useEffect(() => {
    initLanguage()
  }, [language])

  return (
    // ConfigProvider 全局化配置
    <ConfigProvider
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
              <RouterProvider></RouterProvider>
            </RefreshProvider>
          </I18nextProvider>
        </AppProvider>
      </HappyProvider>
    </ConfigProvider>
  )
}

export default App
