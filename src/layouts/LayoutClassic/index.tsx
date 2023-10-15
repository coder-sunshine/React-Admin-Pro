import { RootState, useSelector } from '@/redux'
import { Layout } from 'antd'
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight'
import LayoutMenu from '@/layouts/components/Menu'
import LayoutMain from '@/layouts/components/Main'
import logo from '@/assets/images/logo.svg'

import './index.less'
const { Header, Sider } = Layout
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE

const LayoutClassic: React.FC = () => {
  const { isCollapse } = useSelector((state: RootState) => state.global)
  // 获取所有第一级菜单 --> 用于拆分菜单

  return (
    <section className='layout-classic'>
      <Header>
        <div className='header-lf mask-image'>
          <div className='logo'>
            <img src={logo} alt='logo' className='logo-img' />
            <h2 className='logo-text'>{APP_TITLE}</h2>
          </div>
          {<ToolBarLeft />}
        </div>
        <div className='header-ri'>
          <ToolBarRight />
        </div>
      </Header>
      <div className='classic-content'>
        <Sider width={210} collapsed={isCollapse}>
          <LayoutMenu mode='inline' />
        </Sider>
        <div className='classic-main'>
          <LayoutMain />
        </div>
      </div>
    </section>
  )
}

export default LayoutClassic
