import { RootState, useSelector } from '@/redux'

const Home: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user)
  return <div className='home-container'>{token}123</div>
}

export default Home
