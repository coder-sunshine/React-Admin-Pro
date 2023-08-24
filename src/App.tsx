import { App as AppProvider } from 'antd'
import RouterProvider from '@/routers'
const App: React.FC = () => {
  return (
    <AppProvider>
      <RouterProvider></RouterProvider>
    </AppProvider>
  )
}

export default App
