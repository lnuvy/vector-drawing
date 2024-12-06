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
}

const { ContextProvider, useContext } = createDynamicContext<SelectToolContextProps>()

export const useSelectToolContext = useContext
export const SelectToolContextProvider = ({ children }: { children: React.ReactNode }) => {
  // header selected
  const [tool, setTool] = useState(Tool.Cursor)
  // strokeWidth
  const [weight, setWeight] = useState(10)
  // stroke
  const [color, setColor] = useState("#d01010")

  return <ContextProvider value={{ tool, setTool, weight, setWeight, color, setColor }}>{children}</ContextProvider>
}
