import React from 'react'
import { Layout } from 'antd'
import { useDebounceFn } from 'ahooks'
import { RefreshContext } from '@/context/Refresh'
import { useEffect, createRef, useContext } from 'react'
import { RouteObjectType } from '@/routers/interface'
import { useLocation, useOutlet } from 'react-router-dom'
import { useGlobalStore, useAuthStore } from '@/stores'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Maximize from './components/Maximize'
import LayoutTabs from '@/layouts/components/Tabs'
import LayoutFooter from '@/layouts/components/Footer'
import './index.less'

type RouteTypeWithNodeRef = {
  nodeRef?: React.Ref<HTMLElement> | undefined
} & RouteObjectType

const { Content } = Layout

const LayoutMain: React.FC = () => {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const { outletShow } = useContext(RefreshContext)

  const maximize = useGlobalStore(state => state.maximize)
  const isCollapse = useGlobalStore(state => state.isCollapse)
  const setGlobalState = useGlobalStore(state => state.setGlobalState)

  const flatMenuList = useAuthStore(state => state.flatMenuList)

  // 监听窗口变化，动态设置菜单栏关闭与否
  const { run } = useDebounceFn(
    () => {
      const screenWidth = document.body.clientWidth
      const shouldCollapse = screenWidth < 1200
      if (isCollapse !== shouldCollapse) setGlobalState('isCollapse', shouldCollapse)
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

  // Solve the transition animation that causes useEffect to execute multiple times
  // 解决导致useEffect多次执行的过渡动画
  // @see: http://reactcommunity.org/react-transition-group/with-react-router
  const menuList: RouteTypeWithNodeRef[] = flatMenuList.map(item => ({ ...item, nodeRef: createRef() }))
  const { nodeRef } = menuList.find(route => route.path === pathname) ?? {}

  return (
    <>
      <Maximize />
      <LayoutTabs />
      <SwitchTransition>
        <CSSTransition classNames='fade' key={pathname} nodeRef={nodeRef} timeout={300} exit={false} unmountOnExit>
          <Content ref={nodeRef}>{outletShow && outlet}</Content>
        </CSSTransition>
      </SwitchTransition>
      <LayoutFooter />
    </>
  )
}
export default LayoutMain
