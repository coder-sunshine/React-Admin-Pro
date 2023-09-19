import { Layout } from 'antd'
import { useOutlet } from 'react-router-dom'
import LayoutTabs from '../Tabs'
import { useContext } from 'react'
import { RefreshContext } from '@/context/Refresh'

const { Content } = Layout

const LayoutMain: React.FC = () => {
  const outlet = useOutlet()
  const { outletShow } = useContext(RefreshContext)
  return (
    <>
      <LayoutTabs />
      <Content>{outletShow && outlet}</Content>
    </>
  )
}
export default LayoutMain
