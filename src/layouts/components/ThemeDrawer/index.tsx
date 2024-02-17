import { useGlobalStore } from '@/stores'
import { CheckCircleFilled, FireOutlined, LayoutOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Divider, Drawer, InputNumber, Popover, Switch, Tooltip } from 'antd'
import ColorPicker from './components/ColorPicker'

import './index.less'

const NODE_ENV = import.meta.env.VITE_USER_NODE_ENV

const ThemeDrawer: React.FC = () => {
  const {
    layout,
    compactAlgorithm,
    borderRadius,
    isDark,
    isGrey,
    isWeak,
    isHappy,
    menuSplit,
    siderInverted,
    headerInverted,
    isCollapse,
    accordion,
    watermark,
    breadcrumb,
    breadcrumbIcon,
    tabs,
    tabsIcon,
    tabsDrag,
    footer,
    themeDrawerVisible,
    setGlobalState,
  } = useGlobalStore()

  return (
    <Drawer
      title='主题配置'
      width={290}
      zIndex={999}
      closable={false}
      open={themeDrawerVisible}
      onClose={() => setGlobalState('themeDrawerVisible', false)}
      className='theme-drawer'
    >
      {/* 布局切换 */}
      <Divider className='divider'>
        <LayoutOutlined />
        布局样式
      </Divider>
      <div className='layout-box'>
        <Tooltip placement='top' title='纵向' arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item mb22 layout-vertical ${layout === 'vertical' && 'layout-active'}`}
            onClick={() => setGlobalState('layout', 'vertical')}
          >
            <div className='layout-dark'></div>
            <div className='layout-container'>
              <div className='layout-light'></div>
              <div className='layout-content'></div>
            </div>
            {layout === 'vertical' && <CheckCircleFilled />}
          </div>
        </Tooltip>
        <Tooltip placement='top' title='经典' arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item mb22 layout-classic ${layout === 'classic' && 'layout-active'}`}
            onClick={() => setGlobalState('layout', 'classic')}
          >
            <div className='layout-dark'></div>
            <div className='layout-container'>
              <div className='layout-light'></div>
              <div className='layout-content'></div>
            </div>
            {layout === 'classic' && <CheckCircleFilled />}
          </div>
        </Tooltip>
        <Tooltip placement='top' title='横向' arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item layout-transverse ${layout === 'transverse' && 'layout-active'}`}
            onClick={() => setGlobalState('layout', 'transverse')}
          >
            <div className='layout-dark'></div>
            <div className='layout-content'></div>
            {layout === 'transverse' && <CheckCircleFilled />}
          </div>
        </Tooltip>
        <Tooltip placement='top' title='分栏' arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item layout-columns ${layout === 'columns' && 'layout-active'}`}
            onClick={() => setGlobalState('layout', 'columns')}
          >
            <div className='layout-dark'></div>
            <div className='layout-light'></div>
            <div className='layout-content'></div>
            {layout === 'columns' && <CheckCircleFilled />}
          </div>
        </Tooltip>
      </div>
      <div className='theme-item mt30'>
        <span>
          菜单分割
          <Tooltip title='经典模式下生效'>
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
        <Switch disabled={layout !== 'classic'} checked={menuSplit} onChange={value => setGlobalState('menuSplit', value)} />
      </div>
      <div className='theme-item'>
        <span>
          侧边栏反转色
          <Tooltip title='侧边栏颜色变为深色模式'>
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
        <Switch checked={siderInverted} onChange={value => setGlobalState('siderInverted', value)} />
      </div>
      <div className='theme-item mb35'>
        <span>
          头部反转色
          <Tooltip title='头部颜色变为深色模式'>
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
        <Switch checked={headerInverted} onChange={value => setGlobalState('headerInverted', value)} />
      </div>

      {/* 主题设置 */}
      <Divider className='divider'>
        <FireOutlined />
        全局主题
      </Divider>
      <div className='theme-item'>
        <span>主题颜色</span>
        <Popover placement='left' trigger='click' content={ColorPicker}>
          <label className='primary'></label>
        </Popover>
      </div>
      <div className='theme-item'>
        <span>暗黑模式</span>
        <Switch
          checked={isDark}
          checkedChildren={<span className='dark-icon dark-icon-sun'>🌞</span>}
          unCheckedChildren={<span className='dark-icon dark-icon-moon'>🌛</span>}
          onChange={value => setGlobalState('isDark', value)}
        />
      </div>
      <div className='theme-item'>
        <span>灰色模式</span>
        <Switch
          checked={isGrey}
          onChange={value => {
            if (isWeak) setGlobalState('isWeak', false)
            setGlobalState('isGrey', value)
          }}
        />
      </div>
      <div className='theme-item'>
        <span>色弱模式</span>
        <Switch
          checked={isWeak}
          onChange={value => {
            if (isGrey) setGlobalState('isGrey', false)
            setGlobalState('isWeak', value)
          }}
        />
      </div>
      <div className='theme-item'>
        <span>快乐模式</span>
        <Switch checked={isHappy} onChange={value => setGlobalState('isHappy', value)} />
      </div>
      <div className='theme-item'>
        <span>紧凑主题</span>
        <Switch checked={compactAlgorithm} onChange={value => setGlobalState('compactAlgorithm', value)} />
      </div>
      <div className='theme-item mb35'>
        <span>圆角大小</span>
        <InputNumber
          min={1}
          max={20}
          style={{ width: 80 }}
          defaultValue={borderRadius}
          formatter={value => `${value}px`}
          parser={value => (value ? value!.replace('px', '') : 6) as number}
          onChange={value => {
            const newValue = value || 6
            setGlobalState('borderRadius', newValue)
          }}
        />
      </div>

      {/* 界面设置 */}
      <Divider className='divider'>
        <SettingOutlined />
        界面设置
      </Divider>
      <div className='theme-item'>
        <span>菜单折叠</span>
        <Switch checked={isCollapse} onChange={value => setGlobalState('isCollapse', value)} />
      </div>
      <div className='theme-item'>
        <span>菜单手风琴</span>
        <Switch checked={accordion} onChange={value => setGlobalState('accordion', value)} />
      </div>
      <div className='theme-item'>
        <span>水印</span>
        <Switch
          checked={watermark}
          disabled={NODE_ENV !== 'development'}
          onChange={value => setGlobalState('watermark', value)}
        />
      </div>
      <div className='theme-item'>
        <span>面包屑</span>
        <Switch checked={breadcrumb} onChange={value => setGlobalState('breadcrumb', value)} />
      </div>
      <div className='theme-item'>
        <span>面包屑图标</span>
        <Switch checked={breadcrumbIcon} onChange={value => setGlobalState('breadcrumbIcon', value)} />
      </div>
      <div className='theme-item'>
        <span>标签栏</span>
        <Switch checked={tabs} onChange={value => setGlobalState('tabs', value)} />
      </div>
      <div className='theme-item'>
        <span>标签栏图标</span>
        <Switch checked={tabsIcon} onChange={value => setGlobalState('tabsIcon', value)} />
      </div>
      <div className='theme-item'>
        <span>标签栏拖拽</span>
        <Switch checked={tabsDrag} onChange={value => setGlobalState('tabsDrag', value)} />
      </div>
      <div className='theme-item'>
        <span>页脚</span>
        <Switch checked={footer} onChange={value => setGlobalState('footer', value)} />
      </div>
    </Drawer>
  )
}
export default ThemeDrawer
