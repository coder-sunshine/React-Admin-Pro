import { useEffect, useState } from 'react'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { MetaProps, RouteObjectType } from '@/routers/interface'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { Icon } from '@/components/Icon'
import { RootState, useSelector } from '@/redux'

import './index.less'

interface LayoutMenuProps {
  mode: MenuProps['mode']
  menuList?: RouteObjectType[]
}

const LayoutMenu: React.FC<LayoutMenuProps> = ({ mode, menuList }) => {
  type MenuItem = Required<MenuProps>['items'][number]

  const matches = useMatches()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { showMenuList } = useSelector((state: RootState) => state.auth)
  const { isDark } = useSelector((state: RootState) => state.global)

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }

  const handleMenuAsAntdFormat = (list: RouteObjectType[]): MenuItem[] => {
    return list.map(item => {
      if (!item.children?.length) {
        return getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />)
      } else {
        return getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />, handleMenuAsAntdFormat(item.children))
      }
    })
  }

  const antdMenuList = handleMenuAsAntdFormat(menuList ?? showMenuList)

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps
    // 设置选中的key
    const path = meta?.activeMenu ?? pathname
    setSelectedKeys([path])
  }, [matches])

  const handleMenuNavigation = (path: string) => {
    const menuItem = showMenuList.find(item => item.path === path)
    if (menuItem?.meta?.isFull) {
      window.open(menuItem.meta.isLink, '_blank')
    } else {
      navigate(path)
    }
  }

  const clickMenu: MenuProps['onClick'] = ({ key }) => {
    return handleMenuNavigation(key)
  }

  const isDarkTheme = () => {
    if (isDark) return true
  }

  return (
    <Menu
      theme={isDarkTheme() ? 'dark' : 'light'}
      mode={mode}
      selectedKeys={selectedKeys}
      items={antdMenuList}
      onClick={clickMenu}
    ></Menu>
  )
}

export default LayoutMenu
