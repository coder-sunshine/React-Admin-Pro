import { CSSProperties, useContext } from 'react'
import { Dropdown, type MenuProps } from 'antd'
import { IconFont } from '@/components/Icon'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from '@/redux'
import { HOME_URL } from '@/config'
import {
  CloseCircleOutlined,
  ColumnWidthOutlined,
  ExpandOutlined,
  ReloadOutlined,
  SwitcherOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons'
import { removeTab, closeTabsOnSide, closeMultipleTab } from '@/redux/modules/tabs'
import { setGlobalState } from '@/redux/modules/global'
import { RefreshContext } from '@/context/Refresh'
import { useTranslation } from 'react-i18next'

interface MoreButtonProps {
  path: string
}

const style: CSSProperties = { fontSize: '14px' }

const MoreButton: React.FC<MoreButtonProps> = ({ path }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const { updateOutletShow } = useContext(RefreshContext)

  const refreshCurrentPage = () => {
    updateOutletShow(false)
    setTimeout(() => updateOutletShow(true))
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{t('tabs.refresh')}</span>,
      icon: <ReloadOutlined style={style} />,
      onClick: refreshCurrentPage,
    },
    {
      key: '2',
      label: <span>{t('tabs.maximize')}</span>,
      icon: <ExpandOutlined style={style} />,
      onClick: () => dispatch(setGlobalState({ key: 'maximize', value: true })),
    },
    {
      type: 'divider',
    },

    {
      key: '3',
      label: <span>{t('tabs.closeCurrent')}</span>,
      icon: <CloseCircleOutlined style={style} />,
      onClick: () => dispatch(removeTab({ path, isCurrent: true })),
    },
    {
      key: '4',
      label: <span>{t('tabs.closeLeft')}</span>,
      icon: <VerticalRightOutlined style={style} />,
      onClick: () => dispatch(closeTabsOnSide({ path, type: 'left' })),
    },
    {
      key: '5',
      label: <span>{t('tabs.closeRight')}</span>,
      icon: <VerticalLeftOutlined style={style} />,
      onClick: () => dispatch(closeTabsOnSide({ path, type: 'right' })),
    },
    {
      type: 'divider',
    },
    {
      key: '6',
      label: <span>{t('tabs.closeOther')}</span>,
      icon: <ColumnWidthOutlined style={style} />,
      onClick: () => dispatch(closeMultipleTab({ path })),
    },
    {
      key: '7',
      label: <span>{t('tabs.closeAll')}</span>,
      icon: <SwitcherOutlined style={style} />,
      onClick: () => {
        dispatch(closeMultipleTab({}))
        navigate(HOME_URL)
      },
    },
  ]

  return (
    <div className='more-button'>
      <Dropdown menu={{ items }} placement='bottomRight' arrow={true} trigger={['click']}>
        <div className='more-button-item'>
          <IconFont style={{ fontSize: 22 }} type='icon-xiala' />
        </div>
      </Dropdown>
    </div>
  )
}

export default MoreButton
