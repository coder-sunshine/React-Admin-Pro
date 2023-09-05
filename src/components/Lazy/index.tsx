import React, { Suspense } from 'react'
import { PageLoader } from '../Loading'

/**
 * @description 路由懒加载Loading
 * @param {Element} Comp 需要访问的组件
 * @returns React.ReactNode
 */
const LazyComponent = (Comp: React.LazyExoticComponent<React.ComponentType>) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Comp />
    </Suspense>
  )
}

export default LazyComponent
