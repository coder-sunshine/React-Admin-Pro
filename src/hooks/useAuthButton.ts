import { getMenuByPath } from '@/utils'
import { useAuthStore } from '@/stores'

const useAuthButton = () => {
  const meta = getMenuByPath()?.meta ?? {}

  let currentPageAuthButton: Record<string, boolean> = {}

  const authButtonList = useAuthStore(state => state.authButtonList)
  authButtonList[meta.key!]?.forEach(item => (currentPageAuthButton[item] = true))
  return {
    BUTTONS: currentPageAuthButton,
  }
}

export default useAuthButton
