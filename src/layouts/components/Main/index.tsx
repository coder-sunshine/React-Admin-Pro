import { Layout } from 'antd'
import { useOutlet } from 'react-router-dom'
import LayoutTabs from '../Tabs'

const { Content } = Layout

const LayoutMain: React.FC = () => {
  const outlet = useOutlet()

  return (
    <>
      <LayoutTabs />
      <Content>{outlet}</Content>
    </>
  )
}
export default LayoutMain
