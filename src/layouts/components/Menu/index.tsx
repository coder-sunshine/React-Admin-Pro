import { useEffect, useMemo, useState } from 'react'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { MetaProps, RouteObjectType } from '@/routers/interface'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { Icon } from '@/components/Icon'
import { RootState, useSelector } from '@/redux'
import { getOpenKeys } from '@/utils'

import './index.less'

interface LayoutMenuProps {
  mode: MenuProps['mode']
  menuList?: RouteObjectType[]
  menuSplit?: boolean
}

const LayoutMenu: React.FC<LayoutMenuProps> = ({ mode, menuList, menuSplit }) => {
  type MenuItem = Required<MenuProps>['items'][number]

  const matches = useMatches()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { showMenuList, flatMenuList } = useSelector((state: RootState) => state.auth)
  const { isDark, headerInverted, siderInverted, layout, accordion, isCollapse } = useSelector((state: RootState) => state.global)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [splitSelectedKeys, setSplitSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

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

  const antdMenuList = useMemo(() => handleMenuAsAntdFormat(menuList ?? showMenuList), [menuList, showMenuList])

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps
    // 设置选中的key
    const path = meta?.activeMenu ?? pathname
    setSelectedKeys([path])
    // 设置拆分选定键(find可以用来表示子键)
    const splitPath = `/${path.split('/')[1]}`
    const splitKeys = showMenuList.find(item => item.path === splitPath) ? splitPath : path
    setSplitSelectedKeys([splitKeys])

    // 使用setTimeout来防止菜单展开时出现样式异常
    if (accordion) setTimeout(() => isCollapse || setOpenKeys(getOpenKeys(pathname)))
  }, [matches])

  const handleMenuNavigation = (path: string) => {
    const menuItem = flatMenuList.find(item => item.path === path)
    if (menuItem?.meta?.isFull) {
      window.open(menuItem.meta.isLink, '_blank')
    } else {
      navigate(path)
    }
  }

  const clickMenu: MenuProps['onClick'] = ({ key }) => {
    // 如果菜单没分割，直接跳转
    if (!menuSplit) return handleMenuNavigation(key)

    // 如果菜单分割，且点击的是第一级菜单，跳转到第一个子菜单
    const children = showMenuList.find(item => item.path === key)?.children
    if (children?.length) return handleMenuNavigation(children[0].path!)

    return handleMenuNavigation(key)
  }

  const onOpenChange: MenuProps['onOpenChange'] = openKeys => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }

  const isClassicLayout = useMemo(() => layout === 'classic', [layout])
  const isTransverseLayout = useMemo(() => layout === 'transverse', [layout])

  const isDarkTheme = useMemo(() => {
    if (isDark) return true
    if (headerInverted && isTransverseLayout) return true
    if (headerInverted && isClassicLayout && menuSplit) return true
    if (siderInverted && !isTransverseLayout && !menuSplit) return true
    return false
  }, [layout, isDark, headerInverted, siderInverted, menuSplit])

  return (
    <Menu
      theme={isDarkTheme ? 'dark' : 'light'}
      mode={mode}
      selectedKeys={menuSplit ? splitSelectedKeys : selectedKeys}
      items={antdMenuList}
      onClick={clickMenu}
      {...(!isTransverseLayout && accordion && { openKeys, onOpenChange })}
    ></Menu>
  )
}

export default LayoutMenu
