import { createContext, useState } from 'react'

interface RefreshContextType {
  outletShow: boolean
  updateOutletShow: (value: boolean) => void
}

export const RefreshContext = createContext<RefreshContextType>({
  outletShow: true,
  updateOutletShow: () => {},
})

export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [outletShow, setOutletShow] = useState(true)

  const contextValue = {
    outletShow,
    updateOutletShow: setOutletShow,
  }
  return <RefreshContext.Provider value={contextValue}>{children}</RefreshContext.Provider>
}
