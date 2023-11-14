import React from 'react'
import { useSelector } from '@/redux'
import { getMenuByPath } from '@/utils'

interface AuthButtonProps {
  authority: string | string[]
  children: React.ReactNode
}

const AuthButton: React.FC<AuthButtonProps> = ({ authority, children }) => {
  const authButtonList = useSelector(state => state.auth.authButtonList) ?? []

  const meta = getMenuByPath()?.meta ?? {}
  let isAuth = false

  if (typeof authority === 'string') {
    authButtonList[meta.key!]?.includes(authority) && (isAuth = true)
  }

  if (Array.isArray(authority) && authority.length) {
    const hasPermission = authority.every(item => authButtonList[meta.key!]?.includes(item))
    hasPermission && (isAuth = true)
  }

  return <>{isAuth && children}</>
}

export default React.memo(AuthButton)
