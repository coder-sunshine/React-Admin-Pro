import { useNavigate } from 'react-router-dom'
import { loginApi } from '@/api/modules/login'
import { useDispatch } from '@/redux'
import { setToken } from '@/redux/modules/user'
import { useEffect } from 'react'
import md5 from 'md5'
import { HOME_URL } from '@/config'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    loginApi({ username: 'admin', password: md5('123456') }).then(res => {
      console.log('res.data', res.data.access_token)
      dispatch(setToken(res.data.access_token))
      navigate(HOME_URL)
    })
  }, [])
  return <div className='login-container'>login form</div>
}

export default Login
