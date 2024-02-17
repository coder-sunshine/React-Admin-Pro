import React, { useEffect } from 'react'
import { useAuthStore, useGlobalStore, useTabsStore } from '@/stores'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { Tabs } from 'antd'
import { useUpdateEffect } from 'ahooks'
import { DndContext, PointerSensor, useSensor, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@/components/Icon'
import { MetaProps } from '@/routers/interface'
import { TabsListProp } from '@/stores/interface'
import MoreButton from './components/MoreButton'
import './index.less'

type TargetKey = string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string
}

const DraggableTabNode = ({ ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
  }

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}

const LayoutTabs: React.FC = () => {
  const matches = useMatches()
  const navigate = useNavigate()
  const location = useLocation()

  const path = location.pathname + location.search

  const tabs = useGlobalStore(state => state.tabs)
  const tabsIcon = useGlobalStore(state => state.tabsIcon)
  const tabsDrag = useGlobalStore(state => state.tabsDrag)
  const flatMenuList = useAuthStore(state => state.flatMenuList)

  const { tabsList, addTab, removeTab, setTabsList } = useTabsStore(state => ({
    tabsList: state.tabsList,
    addTab: state.addTab,
    removeTab: state.removeTab,
    setTabsList: state.setTabsList,
  }))

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  useEffect(() => initTabs(), [])

  // 初始化tabs
  const initTabs = () => {
    flatMenuList.forEach(item => {
      // 如果是固定的，并且没有隐藏的，并且不是大屏，则初始化
      if (item.meta?.isAffix && !item.meta.isHide && !item.meta.isFull) {
        const tabValue = {
          icon: item.meta.icon!,
          title: item.meta.title!,
          path: item.path!,
          closable: !item.meta.isAffix,
        }
        addTab(tabValue)
      }
    })
  }
  // 监听路由变化
  useUpdateEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps & { redirect: boolean }
    if (!meta?.redirect) {
      const tabValue = {
        icon: meta.icon!,
        title: meta.title!,
        path: path,
        closable: !meta.isAffix,
      }
      addTab(tabValue)
    }
  }, [matches])

  const items = tabsList.map(item => {
    return {
      key: item.path,
      label: (
        <>
          {tabsIcon && <Icon name={item.icon} />}
          {item.title}
        </>
      ),
      closable: item.closable,
    }
  })

  const onChange = (path: string) => navigate(path)

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove' && typeof targetKey === 'string') {
      removeTab(targetKey, targetKey === path)
    }
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = tabsList.findIndex(i => i.path === active.id)
      const overIndex = tabsList.findIndex(i => i.path === over?.id)
      setTabsList(arrayMove<TabsListProp>(tabsList, activeIndex, overIndex))
    }
  }

  return (
    <>
      {tabs && (
        <Tabs
          className='tabs-box'
          size='middle'
          type='editable-card'
          hideAdd
          items={items}
          activeKey={path}
          onChange={onChange}
          onEdit={onEdit}
          tabBarExtraContent={<MoreButton path={path} />}
          {...(tabsDrag && {
            renderTabBar: (tabBarProps, DefaultTabBar) => (
              <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                <SortableContext items={items.map(i => i.key)} strategy={horizontalListSortingStrategy}>
                  <DefaultTabBar {...tabBarProps}>
                    {node => (
                      <DraggableTabNode {...node.props} key={node.key}>
                        {node}
                      </DraggableTabNode>
                    )}
                  </DefaultTabBar>
                </SortableContext>
              </DndContext>
            ),
          })}
        />
      )}
    </>
  )
}

export default LayoutTabs
