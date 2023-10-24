import { RootState, useSelector } from '@/redux'
import { LayoutType } from '@/redux/interface'
import LayoutVertical from './LayoutVertical'
import LayoutTransverse from './LayoutTransverse'
import LayoutClassic from './LayoutClassic'
import LayoutColumns from './LayoutColumns'
import ThemeDrawer from '@/layouts/components/ThemeDrawer'
import { Watermark } from 'antd'

const LayoutIndex: React.FC = () => {
  const layout = useSelector((state: RootState) => state.global.layout)
  const watermark = useSelector((state: RootState) => state.global.watermark)

  const LayoutComponents: Record<LayoutType, JSX.Element> = {
    vertical: <LayoutVertical />,
    classic: <LayoutClassic />,
    transverse: <LayoutTransverse />,
    columns: <LayoutColumns />,
  }

  return (
    <>
      <Watermark className='watermark-content' zIndex={1001} content={watermark ? ['React Admin', 'Happy Working'] : []}>
        {LayoutComponents[layout]}
        <ThemeDrawer />
      </Watermark>
    </>
  )
}

export default LayoutIndex
