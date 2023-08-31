import { App as AppProvider, theme, ConfigProvider } from 'antd'
import RouterProvider from '@/routers'
import { useSelector } from 'react-redux'
import { RootState } from './redux'

const App: React.FC = () => {
  const { isDark, compactAlgorithm, primary, borderRadius, componentSize } = useSelector((state: RootState) => state.global)

  // 初始化 主题 算法
  const algorithm = () => {
    const algorithmArr = isDark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm]
    // 是否开启紧凑算法 可以组合使用
    if (compactAlgorithm) algorithmArr.push(theme.compactAlgorithm)
    return algorithmArr
  }

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
      <AppProvider>
        <RouterProvider></RouterProvider>
      </AppProvider>
    </ConfigProvider>
  )
}

export default App
