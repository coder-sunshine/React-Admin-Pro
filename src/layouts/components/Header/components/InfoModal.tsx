import { message } from '@/hooks/useMessage'
import { Modal } from 'antd'
import { useImperativeHandle } from 'react'
import { forwardRef, useState } from 'react'

interface InfoModalProps {
  test: string
}

export interface ShowInfoModalProps {
  name: string
}

export interface InfoModalRef {
  showModal: (param: ShowInfoModalProps) => void
}

// forwardRef 泛型参数 第一个是 ref 的类型，第二个是组件props的类型 --> 默认为空对象
// 参数类型 --> 第一个是 props 的类型，第二个是 ref 的类型
const InfoModal = forwardRef<InfoModalRef, InfoModalProps>((_props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
    message.success('修改用户信息成功 🎉')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // 暴露给父组件 --> ref 转发
  const showModal = (params: ShowInfoModalProps) => {
    console.log(params)
    setIsModalOpen(true)
  }

  // 暴露给父组件
  useImperativeHandle(ref, () => {
    return {
      showModal,
    }
  })

  return (
    <Modal title='个人信息' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
      <p>This is UserInfo...</p>
      <p>This is UserInfo...</p>
      <p>This is UserInfo...{_props.test}</p>
    </Modal>
  )
})

export default InfoModal
