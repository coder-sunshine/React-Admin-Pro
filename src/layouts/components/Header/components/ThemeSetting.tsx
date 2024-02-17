import { useGlobalStore } from '@/stores'

const ThemeSetting: React.FC = () => {
  const setGlobalState = useGlobalStore(state => state.setGlobalState)

  const setThemeDrawerVisible = () => {
    setGlobalState('themeDrawerVisible', true)
  }

  return <i className='iconfont icon-zhuti' onClick={setThemeDrawerVisible}></i>
}
export default ThemeSetting
