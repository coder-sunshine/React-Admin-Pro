import { Layout } from 'antd'
import { useLocation, useOutlet } from 'react-router-dom'
import LayoutTabs from '../Tabs'
import LayoutFooter from '@/layouts/components/Footer'
import { createRef, useContext, useEffect } from 'react'
import { RefreshContext } from '@/context/Refresh'
import Maximize from './components/Maximize'
import { RootState, useDispatch, useSelector } from '@/redux'
import { useDebounceFn } from 'ahooks'
import { setGlobalState } from '@/redux/modules/global'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { RouteObjectType } from '@/routers/interface'

import './index.less'

type RouteTypeWithNodeRef = {
  nodeRef?: React.Ref<HTMLElement> | undefined
} & RouteObjectType

const { Content } = Layout

const LayoutMain: React.FC = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const { outletShow } = useContext(RefreshContext)
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse)
  const maximize = useSelector((state: RootState) => state.global.maximize)
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList)

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
