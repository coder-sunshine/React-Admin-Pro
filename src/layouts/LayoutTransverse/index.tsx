import { Layout } from 'antd'
import logo from '@/assets/images/logo.svg'
import LayoutMenu from '@/layouts/components//Menu'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight'
import LayoutMain from '@/layouts/components/Main'

import './index.less'

const { Header } = Layout

const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE
const LayoutTransverse: React.FC = () => {
  return (
    // 横向模式
    <section className='layout-transverse'>
      <Header>
        <div className='logo'>
          <img src={logo} alt='logo' className='logo-img' />
          <h2 className='logo-text'>{APP_TITLE}</h2>
        </div>
        <LayoutMenu mode='horizontal' />
        <ToolBarRight />
      </Header>
      <Layout>
        <LayoutMain />
      </Layout>
    </section>
  )
}

export default LayoutTransverse
