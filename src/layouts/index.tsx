import { RootState, useSelector } from '@/redux'
import { LayoutType } from '@/redux/interface'
import LayoutVertical from './LayoutVertical'
import LayoutTransverse from './LayoutTransverse'
import LayoutClassic from './LayoutClassic'
import LayoutColumns from './LayoutColumns'
import ThemeDrawer from '@/layouts/components/ThemeDrawer'

const LayoutIndex: React.FC = () => {
  const { layout } = useSelector((state: RootState) => state.global)
  const LayoutComponents: Record<LayoutType, JSX.Element> = {
    vertical: <LayoutVertical />,
    classic: <LayoutClassic />,
    transverse: <LayoutTransverse />,
    columns: <LayoutColumns />,
  }

  return (
    <>
      {LayoutComponents[layout]}
      <ThemeDrawer />
    </>
  )
}

export default LayoutIndex
