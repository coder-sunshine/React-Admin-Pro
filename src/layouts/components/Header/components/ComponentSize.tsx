import { useGlobalStore } from '@/stores'
import { type MenuProps, Dropdown } from 'antd'
import type { SizeType } from 'antd/es/config-provider/SizeContext'

const ComponentSize: React.FC = () => {
  const setGlobalState = useGlobalStore(state => state.setGlobalState)
  const componentSize = useGlobalStore(state => state.componentSize)

  const setComponentSize: MenuProps['onClick'] = val => {
    setGlobalState('componentSize', val.key as SizeType)
  }

  const items: MenuProps['items'] = [
    { key: 'middle', label: '默认', disabled: componentSize === 'middle' },
    { key: 'large', label: '大型', disabled: componentSize === 'large' },
    { key: 'small', label: '小型', disabled: componentSize === 'small' },
  ]

  const menuProps = {
    items,
    onClick: setComponentSize,
  }

  return (
    <Dropdown menu={menuProps} placement='bottom' arrow trigger={['click']}>
      <i className='iconfont icon-contentright'></i>
    </Dropdown>
  )
}
export default ComponentSize
