import { NavigateFunction } from 'react-router-dom'

declare global {
  interface Window {
    $navigate: NavigateFunction
  }
}

export {}
