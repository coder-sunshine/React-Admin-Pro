import { NavigateFunction } from 'react-router-dom'

declare global {
  interface Window {
    $navigate: NavigateFunction
    EyeDropper: new () => {
      open(options?: { signal: AbortSignal }): Promise<{ sRGBHex: string }>
    }
  }

  interface Navigator {
    browserLanguage: string
  }
}

export {}
