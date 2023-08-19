import NProgress from '@/config/nprogress'
import { Spin } from 'antd'
import { useEffect } from 'react'
import './index.less'

export const Loading: React.FC = () => {
  return (
    <div className='loading-box'>
      <Spin size='large' />
    </div>
  )
}

export const PageLoader: React.FC = () => {
  useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  }, [])
  return <Loading />
}
