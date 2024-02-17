import { Button } from 'antd'
import { IconFont } from '@/components/Icon'
import { useGlobalStore } from '@/stores'

const SwitchDark: React.FC = () => {
  const isDark = useGlobalStore(state => state.isDark)
  const setGlobalState = useGlobalStore(state => state.setGlobalState)

  return (
    <Button
      type='text'
      size='large'
      className='switch-dark'
      icon={<IconFont style={{ fontSize: 22 }} type={isDark ? 'icon-sun' : 'icon-moon'} />}
      onClick={() => setGlobalState('isDark', !isDark)}
    ></Button>
  )
}

export default SwitchDark
