import { LayoutType } from '@/stores/interface'
import { Watermark } from 'antd'
import { useGlobalStore } from '@/stores'
import LayoutVertical from './LayoutVertical'
import LayoutTransverse from './LayoutTransverse'
import LayoutClassic from './LayoutClassic'
import LayoutColumns from './LayoutColumns'
import ThemeDrawer from '@/layouts/components/ThemeDrawer'

const LayoutIndex: React.FC = () => {
  const layout = useGlobalStore(state => state.layout)
  const watermark = useGlobalStore(state => state.watermark)

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
