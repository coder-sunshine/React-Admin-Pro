import { type MenuProps, Dropdown } from 'antd'
import { useGlobalStore } from '@/stores'
import { LanguageType } from '@/stores/interface'

const Language: React.FC = () => {
  const setGlobalState = useGlobalStore(state => state.setGlobalState)
  const language = useGlobalStore(state => state.language)

  const setLanguage: MenuProps['onClick'] = val => {
    setGlobalState('language', val.key as LanguageType)
  }

  const items: MenuProps['items'] = [
    { key: 'zh', label: '简体中文', disabled: language === 'zh' },
    { key: 'en', label: 'English', disabled: language === 'en' },
  ]

  const menuProps = {
    items,
    onClick: setLanguage,
  }

  return (
    <Dropdown menu={menuProps} placement='bottom' arrow trigger={['click']}>
      <i className='iconfont icon-zhongyingwen'></i>
    </Dropdown>
  )
}
export default Language
