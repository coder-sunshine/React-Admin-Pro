import React from 'react'
import { LayoutType } from '@/stores/interface'
import { useGlobalStore } from '@/stores'
import ThemeDrawer from '@/layouts/components/ThemeDrawer'
import { Watermark } from 'antd'
import LazyComponent from '@/components/Lazy'

const LayoutIndexAsync: React.FC = () => {
  const layout = useGlobalStore(state => state.layout)
  const watermark = useGlobalStore(state => state.watermark)

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
