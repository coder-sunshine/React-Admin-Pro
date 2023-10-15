import { RootState, useSelector } from '@/redux'
import { Layout } from 'antd'
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight'
import LayoutMenu from '@/layouts/components/Menu'
import LayoutMain from '@/layouts/components/Main'
import CollapseIcon from '../components/Header/components/CollapseIcon'
import { useEffect, useState } from 'react'
import { RouteObjectType } from '@/routers/interface'
import { useLocation } from 'react-router-dom'
import { getFirstLevelMenuList } from '@/utils'
import logo from '@/assets/images/logo.svg'

import './index.less'

const { Header, Sider } = Layout
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE

const LayoutClassic: React.FC = () => {
  const { isCollapse, menuSplit } = useSelector((state: RootState) => state.global)
  const { showMenuList } = useSelector((state: RootState) => state.auth)
  // 获取所有第一级菜单 --> 用于拆分菜单
  const firstLevelMenuList = getFirstLevelMenuList(showMenuList)

  const [subMenuList, setSubMenuList] = useState<RouteObjectType[]>([])

  const { pathname } = useLocation()

  useEffect(() => {
    if (menuSplit) changeSubMenu()
  }, [pathname, menuSplit])

  const changeSubMenu = () => {
    const menuItem = showMenuList.find(item => {
      return pathname === item.path || `/${pathname.split('/')[1]}` === item.path
    })
    setSubMenuList(menuItem?.children || [])
  }

  return (
    <section className='layout-classic'>
      <Header>
        <div className={`header-lf ${menuSplit ? 'hide-logo' : 'mask-image'}`}>
          <div className='logo'>
            <img src={logo} alt='logo' className='logo-img' />
            <h2 className='logo-text'>{APP_TITLE}</h2>
          </div>
          {menuSplit ? <LayoutMenu mode='horizontal' menuList={firstLevelMenuList} menuSplit={true} /> : <ToolBarLeft />}
        </div>
        <div className='header-ri'>
          <ToolBarRight />
        </div>
      </Header>
      <div className='classic-content'>
        <Sider width={210} collapsed={isCollapse} className={`${!subMenuList.length && menuSplit ? 'not-sider' : ''}`}>
          {menuSplit ? (
            <>
              {subMenuList.length ? (
                <>
                  <LayoutMenu mode='inline' menuList={subMenuList} />
                  <div className='collapse-box'>
                    <CollapseIcon />
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <LayoutMenu mode='inline' />
          )}
        </Sider>
        <div className='classic-main'>
          <LayoutMain />
        </div>
      </div>
    </section>
  )
}

export default LayoutClassic
