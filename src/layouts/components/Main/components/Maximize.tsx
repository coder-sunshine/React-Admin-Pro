import { RootState, useDispatch, useSelector } from '@/redux'
import { setGlobalState } from '@/redux/modules/global'

const Maximize: React.FC = () => {
  const dispatch = useDispatch()

  const maximize = useSelector((state: RootState) => state.global.maximize)

  return (
    <>
      {maximize && (
        <div className='maximize-icon' onClick={() => dispatch(setGlobalState({ key: 'maximize', value: false }))}>
          <i className='iconfont icon-tuichu'></i>
        </div>
      )}
    </>
  )
}

export default Maximize
