"use client"

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
}

const { ContextProvider, useContext } = createDynamicContext<SelectToolContextProps>()

export const useSelectToolContext = useContext
export const SelectToolContextProvider = ContextProvider
