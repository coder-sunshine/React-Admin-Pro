import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd/es/form'
import { UserOutlined, LockOutlined, CloseCircleOutlined, CheckCircleFilled } from '@ant-design/icons'
import { message, notification } from '@/hooks/useMessage'
import { loginApi } from '@/api/modules/login'
import md5 from 'md5'
import { useDispatch } from '@/redux'
import { setToken } from '@/redux/modules/user'
import { getTimeState } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config'
import usePermissions from '@/hooks/usePermissions'
import { setTabsList } from '@/redux/modules/tabs'

const LoginForm: React.FC = () => {
  type FieldType = {
    username: string
    password: string
  }

  const [formInstance] = Form.useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { initPermissions } = usePermissions()

  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      message.open({ type: 'loading', content: '登录中...' })

      const { data } = await loginApi({ ...values, password: md5(values.password) })
      dispatch(setToken(data.access_token))

      // 清除tabs
      dispatch(setTabsList([]))

      // 设置权限
      await initPermissions(data.access_token)

      notification.success({
        message: getTimeState(),
        description: '欢迎登录 Hooks-Admin',
        icon: <CheckCircleFilled style={{ color: '#73d13d' }} />,
      })
      navigate(HOME_URL)
    } finally {
      setLoading(false)
      message.destroy()
    }
  }

  const onFinishFailed: FormProps['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const onReset = () => {
    formInstance.resetFields()
  }

  return (
    <div className='login-form-content'>
      <Form name='login' size='large' autoComplete='off' form={formInstance} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input prefix={<UserOutlined />} placeholder='User：admin / user' />
        </Form.Item>

        <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder='Password：123456' />
        </Form.Item>

        <Form.Item className='login-form-button'>
          <Button shape='round' icon={<CloseCircleOutlined />} onClick={onReset}>
            Reset
          </Button>
          <Button type='primary' shape='round' icon={<UserOutlined />} loading={loading} htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default LoginForm
