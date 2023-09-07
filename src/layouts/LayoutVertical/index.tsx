import { RootState, useSelector } from '@/redux'
import { Layout } from 'antd'
import logo from '@/assets/images/logo.svg'
import LayoutMenu from '../components/Menu'
import ToolBarLeft from '../components/Header/ToolBarLeft'
import ToolBarRight from '../components/Header/ToolBarRight'

import './index.less'

const { Sider, Header } = Layout

const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE

const LayoutVertical: React.FC = () => {
  const { isCollapse } = useSelector((state: RootState) => state.global)

  return (
    <section className='layout-vertical'>
      <Sider width={210} collapsed={isCollapse}>
        <div className='logo'>
          <img src={logo} alt='logo' className='logo-img' />
          {!isCollapse && <h2 className='logo-text'>{APP_TITLE}</h2>}
        </div>
        <LayoutMenu mode='inline' />
      </Sider>
      <Layout>
        <Header>
          <ToolBarLeft />
          <ToolBarRight />
        </Header>
      </Layout>
    </section>
  )
}

export default LayoutVertical
