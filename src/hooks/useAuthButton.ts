import { RootState, useSelector } from '@/redux'
import { getMenuByPath } from '@/utils'

const useAuthButton = () => {
  const meta = getMenuByPath()?.meta ?? {}

  let currentPageAuthButton: Record<string, boolean> = {}

  const authButtonList = useSelector((state: RootState) => state.auth.authButtonList)
  authButtonList[meta.key!]?.forEach(item => (currentPageAuthButton[item] = true))
  return {
    BUTTONS: currentPageAuthButton,
  }
}

export default useAuthButton
