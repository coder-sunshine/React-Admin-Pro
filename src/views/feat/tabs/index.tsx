import { useContext, useState } from 'react'
import { HOME_URL } from '@/config'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGlobalStore, useTabsStore } from '@/stores'
import { Button, Card, Divider, Input, Space, Typography } from 'antd'
import { message } from '@/hooks/useMessage'
import { RefreshContext } from '@/context/Refresh'
import {
  ReloadOutlined,
  ExpandOutlined,
  CompressOutlined,
  CloseCircleOutlined,
  ColumnWidthOutlined,
  SwitcherOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  SmileOutlined,
} from '@ant-design/icons'

const Tabs: React.FC = () => {
  const navigate = useNavigate()

  const { pathname, search } = useLocation()
  const path = pathname + search

  const [value, setValue] = useState('')

  const maximize = useGlobalStore(state => state.maximize)
  const setGlobalState = useGlobalStore(state => state.setGlobalState)

  const { removeTab, setTabTitle, closeTabsOnSide, closeMultipleTab } = useTabsStore(state => ({
    removeTab: state.removeTab,
    setTabTitle: state.setTabTitle,
    closeTabsOnSide: state.closeTabsOnSide,
    closeMultipleTab: state.closeMultipleTab,
  }))

  const { updateOutletShow } = useContext(RefreshContext)

  const refreshCurrentPage = () => {
    updateOutletShow(false)
    setTimeout(() => updateOutletShow(true))
  }

  const handleToDetail = (id: string, query: string = '') => {
    navigate(`/feat/tabs/detail/${id}${query}`)
  }

  return (
    <>
      <Card className='mb10'>
        <Typography.Title level={4} className='mb20'>
          Tab 标题
        </Typography.Title>
        <Space.Compact style={{ width: '350px' }}>
          <Input placeholder='Please enter content' value={value} onChange={e => setValue(e.target.value)} />
          <Button
            type='primary'
            onClick={() => {
              if (!value) return message.warning('请输入 Tab 标题')
              setTabTitle(value)
            }}
          >
            Submit
          </Button>
        </Space.Compact>
      </Card>

      <Card className='mb10'>
        <Typography.Title level={4} className='mb20'>
          Tab 操作
        </Typography.Title>
        <Space className='text'>
          <Button type='primary' icon={<ReloadOutlined />} onClick={refreshCurrentPage}>
            刷新当前页
          </Button>
          <Button
            type='primary'
            icon={maximize ? <CompressOutlined /> : <ExpandOutlined />}
            onClick={() => setGlobalState('maximize', !maximize)}
          >
            当前页全屏切换
          </Button>
          <Button type='primary' icon={<CloseCircleOutlined />} onClick={() => removeTab(path, true)}>
            关闭当前标签页
          </Button>
          <Button type='primary' icon={<VerticalRightOutlined />} onClick={() => closeTabsOnSide(path, 'left')}>
            关闭左侧标签页
          </Button>
          <Button type='primary' icon={<VerticalLeftOutlined />} onClick={() => closeTabsOnSide(path, 'right')}>
            关闭右侧标签页
          </Button>
          <Button type='primary' icon={<ColumnWidthOutlined />} onClick={() => closeMultipleTab(path)}>
            关闭其它标签页
          </Button>
          <Button
            type='primary'
            icon={<SwitcherOutlined />}
            onClick={() => {
              closeMultipleTab()
              navigate(HOME_URL)
            }}
          >
            关闭所有标签页
          </Button>
        </Space>
      </Card>

      <Card>
        <Typography.Title level={4} className='mb20'>
          Tab 跳转
        </Typography.Title>
        <Space className='text'>
          <Button type='primary' icon={<SmileOutlined />} onClick={() => handleToDetail('1')}>
            打开详情页1
          </Button>
          <Button type='primary' icon={<SmileOutlined />} onClick={() => handleToDetail('2')}>
            打开详情页2
          </Button>
          <Button type='primary' icon={<SmileOutlined />} onClick={() => handleToDetail('3')}>
            打开详情页3
          </Button>
          <Button type='primary' icon={<SmileOutlined />} onClick={() => handleToDetail('4')}>
            打开详情页4
          </Button>
          <Button type='primary' icon={<SmileOutlined />} onClick={() => handleToDetail('5', '?params=detail-page')}>
            打开详情页5 + Query 参数
          </Button>
        </Space>
        <Divider />
        <Button type='primary' icon={<SmileOutlined />} onClick={() => navigate('/noLayout/index')}>
          No layout 空白页
        </Button>
      </Card>
    </>
  )
}

export default Tabs
