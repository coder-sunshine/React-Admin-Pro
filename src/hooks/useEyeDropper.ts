import { useState, useEffect } from 'react'

interface EyeDropperResult {
  color: string
  isEnabled: boolean
  openEyeDropper: () => void
  cancelEyeDropper: () => void
}

/**
 * @description  Use EyeDropper
 */
const useEyeDropper = (): EyeDropperResult => {
  const [color, setColor] = useState('')
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    // 检查是否支持EyeDropper API
    if (!window.EyeDropper) {
      setIsEnabled(false)
    }
  }, [])

  const abortController = new AbortController()

  const openEyeDropper = async () => {
    if (!window.EyeDropper) {
      console.log('EyeDropper API is not supported in this browser.')
      return
    }
    // Create a new EyeDropper instance
    const eyeDropper = new window.EyeDropper()

    // Open the EyeDropper
    try {
      const result = await eyeDropper.open({ signal: abortController.signal })
      setColor(result.sRGBHex)
    } catch (error) {
      console.log(error)
    }
  }

  const cancelEyeDropper = () => {
    abortController.abort()
  }

  return { color, isEnabled, openEyeDropper, cancelEyeDropper }
}

export default useEyeDropper
