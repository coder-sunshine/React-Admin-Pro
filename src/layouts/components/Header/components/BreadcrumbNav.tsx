import { Icon } from '@/components/Icon'
import { HOME_URL } from '@/config'
import { RootState, useSelector } from '@/redux'
import { MetaProps, RouteObjectType } from '@/routers/interface'
import { getAllBreadcrumbList } from '@/utils'
import { Breadcrumb } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useEffect, useState } from 'react'
import { Link, useMatches } from 'react-router-dom'

const BreadcrumbNav: React.FC = () => {
  const matches = useMatches()
  const { breadcrumbIcon, breadcrumb } = useSelector((state: RootState) => state.global)
  const { authMenuList } = useSelector((state: RootState) => state.auth)
  // 获取全部的面包屑列表
  const breadcrumbAllList = getAllBreadcrumbList(authMenuList)

  const [curBreadcrumbList, setCurBreadcrumbList] = useState<ItemType[]>([])

  // 渲染面包屑的标题
  const renderTitle = (item: RouteObjectType, isLink: boolean) => {
    const { icon, title } = item.meta || {}
    const content = (
      <>
        <span className='mr5'>{breadcrumbIcon && <Icon name={icon!} />}</span>
        <span>{title}</span>
      </>
    )

    return isLink ? <Link to={item.path!}>{content}</Link> : content
  }

  useEffect(() => {
    // matches数组中的 data 返回的就是路由的 loader 信息
    const meta = matches[matches.length - 1].data as MetaProps
    if (!meta.key) return

    // 获取当前页面对应的面包屑 --> 数组最后一项就是当前菜单的面包屑
    let breadcrumbList = breadcrumbAllList[meta.key] || []

    // 如果不需要在主页上添加面包屑，可以删除以下判断
    if (breadcrumbList[0].path !== HOME_URL) {
      breadcrumbList.unshift({ path: HOME_URL, meta: { icon: 'HomeOutlined', title: '首页' } })
    }

    // 把面包屑数据处理成 antd 所需要的格式
    const antdBreadcrumbList = breadcrumbList.map(item => {
      // 如果是最后一项需要处理为不能点击
      const isLast = breadcrumbList.lastIndexOf(item) === breadcrumbList.length - 1
      if (isLast) return { title: renderTitle(item, false) }

      if (item.children) {
        const items = item.children.filter(itm => !itm.meta?.isHide)
        // 如果子菜单有数据加下拉菜单
        if (items.length) {
          return {
            dropdownProps: { arrow: { pointAtCenter: true } },
            title: <a>{renderTitle(item, false)}</a>,
            menu: {
              items: items.map(child => {
                return { title: renderTitle(child, true) }
              }),
            },
          }
        } else {
          return { title: renderTitle(item, true) }
        }
      }

      // 没有子菜单的时候，直接返回
      return { title: renderTitle(item, true) }
    })
    setCurBreadcrumbList(antdBreadcrumbList)
  }, [matches, breadcrumbIcon])

  return <>{breadcrumb && <Breadcrumb items={curBreadcrumbList} />}</>
}

export default BreadcrumbNav
