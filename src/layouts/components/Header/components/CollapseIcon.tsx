import React from 'react'
import { RootState, useDispatch, useSelector } from '@/redux'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { setGlobalState } from '@/redux/modules/global'

const CollapseIcon: React.FC = () => {
  const dispatch = useDispatch()
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse)
  return (
    <>
      {React.createElement(isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'collapsed',
        onClick: () => dispatch(setGlobalState({ key: 'isCollapse', value: !isCollapse })),
      })}
    </>
  )
}

export default CollapseIcon
