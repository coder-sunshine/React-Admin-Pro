import React from 'react'
import * as Icons from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons'

interface IconProps {
  name: string
  className?: string
}

export const Icon: React.FC<IconProps> = React.memo(({ name, className }) => {
  const customIcons: { [key: string]: any } = Icons
  if (!name) return null
  return React.createElement(customIcons[name], { className })
})

export const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_3878708_l04g6iwc6y.js'],
})
