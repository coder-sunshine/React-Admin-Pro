import React from 'react'
import { RootState, useSelector } from '@/redux'
import { LayoutType } from '@/redux/interface'
import ThemeDrawer from '@/layouts/components/ThemeDrawer'
import { Watermark } from 'antd'
import LazyComponent from '@/components/Lazy'

const LayoutIndexAsync: React.FC = () => {
  const layout = useSelector((state: RootState) => state.global.layout)
  const watermark = useSelector((state: RootState) => state.global.watermark)

  const LayoutComponents: Record<LayoutType, React.LazyExoticComponent<React.ComponentType>> = {
    vertical: React.lazy(() => import('./LayoutVertical')),
    classic: React.lazy(() => import('./LayoutClassic')),
    transverse: React.lazy(() => import('./LayoutTransverse')),
    columns: React.lazy(() => import('./LayoutColumns')),
  }

  return (
    <>
      <Watermark className='watermark-content' zIndex={1001} content={watermark ? ['Hooks Admin', 'Happy Working'] : []}>
        {LazyComponent(LayoutComponents[layout])}
        <ThemeDrawer />
      </Watermark>
    </>
  )
}

export default LayoutIndexAsync
