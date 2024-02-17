import { useUserStore } from '@/stores'

const UserName: React.FC = () => {
  const userInfo = useUserStore(state => state.userInfo)

  return <span className='username'>{userInfo.name}</span>
}

export default UserName
