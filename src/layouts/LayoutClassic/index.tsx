import { RootState, useSelector } from '@/redux'
import { Layout } from 'antd'
import LayoutMenu from '../components/Menu'

import logo from '@/assets/images/logo.svg'
import { getFirstLevelMenuList } from '@/utils'

import './index.less'

const { Header } = Layout
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE

const LayoutClassic: React.FC = () => {
  const { menuSplit } = useSelector((state: RootState) => state.global)
  const { showMenuList } = useSelector((state: RootState) => state.auth)

  // 获取所有第一级菜单 --> 用于拆分菜单
  const firstLevelMenuList = getFirstLevelMenuList(showMenuList)

  return (
    <section className='layout-classic'>
      <Header>
        <div className={`header-lf ${menuSplit ? 'hide-logo' : 'mask-image'}`}>
          <div className='logo'>
            <img src={logo} alt='logo' className='logo-img' />
            <h2 className='logo-text'>{APP_TITLE}</h2>
          </div>
          {menuSplit ? <LayoutMenu mode='horizontal' menuList={firstLevelMenuList} /> : null}
        </div>
      </Header>
    </section>
  )
}

export default LayoutClassic
