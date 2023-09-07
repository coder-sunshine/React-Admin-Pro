import { useNavigate } from 'react-router-dom'
import { RouteObjectType } from '@/routers/interface'
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

  const navigate = useNavigate()
  const { showMenuList } = useSelector((state: RootState) => state.auth)

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

  return <Menu mode={mode} items={antdMenuList} onClick={clickMenu}></Menu>
}

export default LayoutMenu
