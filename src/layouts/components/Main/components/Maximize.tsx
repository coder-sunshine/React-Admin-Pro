import { useGlobalStore } from '@/stores'

const Maximize: React.FC = () => {
  const setGlobalState = useGlobalStore(state => state.setGlobalState)

  const maximize = useGlobalStore(state => state.maximize)

  return (
    <>
      {maximize && (
        <div className='maximize-icon' onClick={() => setGlobalState('maximize', false)}>
          <i className='iconfont icon-tuichu'></i>
        </div>
      )}
    </>
  )
}

export default Maximize
