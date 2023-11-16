import { useRef, useState } from 'react'

interface ClipboardFunctions {
  copyToClipboard: (text: string) => void
}

type TextareaRef = React.RefObject<HTMLTextAreaElement>

type ClipboardHook = ClipboardFunctions & {
  isCopied: boolean
  textareaRef: TextareaRef
}

/**
 * @description  Use Clipboard
 */
const useClipboard = (): ClipboardHook => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
    } catch (err) {
      console.error('复制操作不被支持或失败: ', err)
    }
  }

  return { copyToClipboard, isCopied, textareaRef }
}

export default useClipboard
