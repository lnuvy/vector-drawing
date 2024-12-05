"use client"

import React, { useContext } from "react"

/**
 * Context와 ContextProvider를 동적으로 사용하기 위한 컨텍스트 함수입니다.
 */
export const createDynamicContext = <TProps extends object>() => {
  const CreateContext = React.createContext<TProps | null>(null)

  const useDynamicContext = () => {
    const contextState = useContext(CreateContext)
    if (contextState == null) {
      throw Error(`해당 Context의 Provider가 상위에 없습니다.`)
    }
    return contextState
  }

  const ContextProvider = ({ children, value }: { children: React.ReactNode; value: TProps }) => (
    <CreateContext.Provider value={value}>{children}</CreateContext.Provider>
  )

  return {
    useContext: useDynamicContext,
    Context: CreateContext,
    ContextProvider,
  }
}
