import React from 'react'
import { useGlobalStore } from '@/stores'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const CollapseIcon: React.FC = () => {
  const setGlobalState = useGlobalStore(state => state.setGlobalState)
  const isCollapse = useGlobalStore(state => state.isCollapse)

  return (
    <>
      {React.createElement(isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'collapsed',
        onClick: () => setGlobalState('isCollapse', !isCollapse),
      })}
    </>
  )
}

export default CollapseIcon
