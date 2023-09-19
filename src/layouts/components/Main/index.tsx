import { Layout } from 'antd'
import { useOutlet } from 'react-router-dom'
import LayoutTabs from '../Tabs'
import { useContext, useEffect } from 'react'
import { RefreshContext } from '@/context/Refresh'
import Maximize from './components/Maximize'
import { RootState, useSelector } from '@/redux'

import './index.less'

const { Content } = Layout

const LayoutMain: React.FC = () => {
  const outlet = useOutlet()
  const { outletShow } = useContext(RefreshContext)
  const { maximize } = useSelector((state: RootState) => state.global)

  // 监控当前页面是否最大化，动态添加类
  useEffect(() => {
    const root = document.getElementById('root') as HTMLElement
    root.classList.toggle('main-maximize', maximize)
  }, [maximize])

  return (
    <>
      <Maximize />
      <LayoutTabs />
      <Content>{outletShow && outlet}</Content>
    </>
  )
}
export default LayoutMain
