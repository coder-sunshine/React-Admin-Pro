import { Layout } from 'antd'
import { useOutlet } from 'react-router-dom'
import LayoutTabs from '../Tabs'
import { useContext, useEffect } from 'react'
import { RefreshContext } from '@/context/Refresh'
import Maximize from './components/Maximize'
import { RootState, useDispatch, useSelector } from '@/redux'
import { useDebounceFn } from 'ahooks'
import { setGlobalState } from '@/redux/modules/global'

import './index.less'

const { Content } = Layout

const LayoutMain: React.FC = () => {
  const dispatch = useDispatch()
  const outlet = useOutlet()
  const { outletShow } = useContext(RefreshContext)
  const { maximize, isCollapse } = useSelector((state: RootState) => state.global)

  // 监听窗口变化，动态设置菜单栏关闭与否
  const { run } = useDebounceFn(
    () => {
      const screenWidth = document.body.clientWidth
      const shouldCollapse = screenWidth < 1200
      if (isCollapse !== shouldCollapse) dispatch(setGlobalState({ key: 'isCollapse', value: shouldCollapse }))
    },
    { wait: 100 }
  )
  useEffect(() => {
    window.addEventListener('resize', run, false)
    return () => window.removeEventListener('resize', run)
  }, [])

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
