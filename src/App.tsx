import { useEffect } from 'react'
import { App as AppProvider } from 'antd'
import RouterProvider from '@/routers'
import './App.css'
import md5 from 'md5'
import { loginApi } from './api/modules/login'
const App: React.FC = () => {
  useEffect(() => {
    loginApi({ username: 'admin', password: md5('1234526') }).then(res => {
      console.log('res', res)
    })
  }, [])

  return (
    <AppProvider>
      <RouterProvider></RouterProvider>
    </AppProvider>
  )
}

export default App
