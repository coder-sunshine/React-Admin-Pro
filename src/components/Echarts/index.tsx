import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import echarts, { ECOption } from './config'
import { ECElementEvent, EChartsType } from 'echarts'
import { useDebounceFn, useTimeout } from 'ahooks'
import { useGlobalStore } from '@/stores'

export interface EChartProps {
  option: ECOption | null | undefined
  isResize?: boolean
  width?: number | string
  height?: number | string
  onClick?: (event: ECElementEvent) => any
}

export interface EChartsRef {
  instance(): EChartsType | undefined
}
const EChartInner = forwardRef<EChartsRef, EChartProps>(({ option, isResize = true, width, height, onClick }, ref) => {
  const cRef = useRef<HTMLDivElement>(null)
  const cInstance = useRef<EChartsType>()
  const [isFirstRun, setIsFirstRun] = useState(true)

  const { tabs, footer, maximize, isCollapse, menuSplit } = useGlobalStore(state => ({
    tabs: state.tabs,
    footer: state.footer,
    maximize: state.maximize,
    isCollapse: state.isCollapse,
    menuSplit: state.menuSplit,
  }))

  const handleClick = (event: ECElementEvent) => onClick && onClick(event)

  useEffect(() => {
    if (cRef.current) {
      cInstance.current = echarts.getInstanceByDom(cRef.current) as ReturnType<EChartsRef['instance']>
      if (!cInstance.current) {
        cInstance.current = echarts.init(cRef.current, undefined, { renderer: 'svg' }) as unknown as ReturnType<
          EChartsRef['instance']
        >
        cInstance.current?.on('click', handleClick)
      }
      option && cInstance.current?.setOption(option)
    }
  }, [cRef, option])

  const { run } = useDebounceFn(() => cInstance.current?.resize({ animation: { duration: 300 } }), {
    wait: 300,
  })

  useTimeout(() => {
    setIsFirstRun(false)
  }, 1000)

  useLayoutEffect(() => {
    if (isResize && !isFirstRun) run()
  }, [width, height, run, isFirstRun, tabs, footer, maximize, menuSplit, isCollapse])

  useEffect(() => {
    if (!isResize) return
    window.addEventListener('resize', run)
    return () => {
      window.removeEventListener('resize', run)
    }
  }, [run])

  useImperativeHandle(ref, () => ({
    instance: () => cInstance.current,
  }))

  const echartsStyle = useMemo(
    () => (width || height ? { height, width } : { height: '100%', width: '100%', flex: 1 }),
    [width, height]
  )

  return <div ref={cRef} style={echartsStyle} />
})

const ECharts = React.memo(EChartInner)

export default ECharts
