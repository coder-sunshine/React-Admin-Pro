import { RootState, useSelector } from '@/redux'
import { LayoutType } from '@/redux/interface'

import LayoutVertical from './LayoutVertical'
import LayoutTransverse from './LayoutTransverse'
import LayoutClassic from './LayoutClassic'
import LayoutColumns from './LayoutColumns'

const LayoutIndex: React.FC = () => {
  const { layout } = useSelector((state: RootState) => state.global)
  const LayoutComponents: Record<LayoutType, JSX.Element> = {
    vertical: <LayoutVertical />,
    classic: <LayoutClassic />,
    transverse: <LayoutTransverse />,
    columns: <LayoutColumns />,
  }

  return <>{LayoutComponents[layout]}</>
}

export default LayoutIndex
