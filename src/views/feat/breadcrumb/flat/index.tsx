import { Button, Card } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const BreadcrumbFlat: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Card>
      <Button type='primary' icon={<SmileOutlined />} onClick={() => navigate('/feat/breadcrumb/flatDetail')}>
        打开详情页
      </Button>
    </Card>
  )
}

export default BreadcrumbFlat
