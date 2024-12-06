"use client"

import { useState } from "react"
import { createDynamicContext } from "../hooks/create-dynamic-context"

/** 헤더 선택 도구 */
export enum Tool {
  Cursor = "cursor",
  SimpleLine = "simple-line",
  Spline = "spline",
  Rect = "rect",
  Circle = "circle",
  Polygon = "polygon",
}

interface SelectToolContextProps {
  tool: Tool
  setTool: (tool: Tool) => void
  weight: number
  setWeight: (weight: number) => void
  color: string
  setColor: (color: string) => void
  sides: number
  setSides: (sides: number) => void
}

const { ContextProvider, useContext } = createDynamicContext<SelectToolContextProps>()

export const useSelectToolContext = useContext
export const SelectToolContextProvider = ({ children }: { children: React.ReactNode }) => {
  // 현재 선택된 타입
  const [tool, setTool] = useState(Tool.Cursor)
  // 두께 (strokeWidth)
  const [weight, setWeight] = useState(5)
  // 색깔 (stroke)
  const [color, setColor] = useState("#d01010")
  // 다각형 꼭짓점 수 (sides)
  const [sides, setSides] = useState(5)

  return (
    <ContextProvider value={{ tool, setTool, weight, setWeight, color, setColor, sides, setSides }}>
      {children}
    </ContextProvider>
  )
}
