import { RootState, useSelector } from '@/redux'
import { useLocation } from 'react-router-dom'
import { Tabs } from 'antd'
import { Icon } from '@/components/Icon'

const LayoutTabs: React.FC = () => {
  const location = useLocation()
  const path = location.pathname + location.search

  const { tabs, tabsIcon } = useSelector((state: RootState) => state.global)
  const { tabsList } = useSelector((state: RootState) => state.tabs)

  const items = tabsList.map(item => {
    return {
      key: item.path,
      label: (
        <>
          {tabsIcon && <Icon name={item.icon} />}
          {item.title}
        </>
      ),
      closable: item.closable,
    }
  })

  return (
    <>
      {tabs && (
        <Tabs
          className='tabs-box'
          size='middle'
          type='editable-card'
          hideAdd
          items={items}
          activeKey={path}
          // onChange={onChange}
        />
      )}
    </>
  )
}

export default LayoutTabs
