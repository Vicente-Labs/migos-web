'use client'

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react'

type GroupModalContext = {
  isNewGroupModalOpen: boolean
  setIsNewGroupModalOpen: (isOpen: boolean) => void
}

export const GroupModalContext = createContext({} as GroupModalContext)

export const GroupModalContextProvider = ({ children }: PropsWithChildren) => {
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false)

  return (
    <GroupModalContext.Provider
      value={{ isNewGroupModalOpen, setIsNewGroupModalOpen }}
    >
      {children}
    </GroupModalContext.Provider>
  )
}

export const useGroupModalState = () => {
  const context = useContext(GroupModalContext)

  if (!context) {
    throw new Error(
      'GroupModalContext must be used within GroupModalContextProvider',
    )
  }

  return context
}
