import { useState } from "react"
import { createDynamicContext } from "../hooks/create-dynamic-context"
import type Konva from "konva"
import { Tool } from "./select-tool-context"

export type AddDragging<T> = T & { id: string; isDragging: boolean }

export type Shape =
  | (AddDragging<Konva.LineConfig> & { type: Tool.SimpleLine | Tool.Spline })
  | (AddDragging<Konva.EllipseConfig> & { type: Tool.Circle })
  | (AddDragging<Konva.RectConfig> & { type: Tool.Rect })
  | (AddDragging<Konva.RegularPolygonConfig> & { type: Tool.Polygon })

interface ShapesHistoryContextProps {
  shapes: Shape[]
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
  setShapesWithHistory: React.Dispatch<React.SetStateAction<Shape[]>>
  previewLine: Konva.LineConfig | null
  setPreviewLine: React.Dispatch<React.SetStateAction<Konva.LineConfig | null>>
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const { ContextProvider, useContext } = createDynamicContext<ShapesHistoryContextProps>()

export const useShapesHistoryContext = useContext

const MAX_HISTORY_SIZE = 40

export const ShapesHistoryContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [previewLine, setPreviewLine] = useState<Konva.LineConfig | null>(null)

  const [history, setHistory] = useState<Shape[][]>([[]])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0)

  /**
   * shapes 업데이트와 동시에 history를 업데이트하는 함수
   * use-create-shape-event에서 MouseUp 이벤트 발생시 명시적으로 실행
   */
  const updateShapes = (updater: Shape[] | ((prev: Shape[]) => Shape[])) => {
    setShapes(prev => {
      const newShapes = typeof updater === "function" ? updater(prev) : updater

      const newHistory = history.slice(0, currentHistoryIndex + 1)
      newHistory.push(newShapes)

      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift()
      }

      setHistory(newHistory)
      setCurrentHistoryIndex(newHistory.length - 1)

      return newShapes
    })
  }

  const undo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(prev => prev - 1)
      setShapes(history[currentHistoryIndex - 1])
    }
  }

  const redo = () => {
    if (currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(prev => prev + 1)
      setShapes(history[currentHistoryIndex + 1])
    }
  }

  const canUndo = currentHistoryIndex > 0
  const canRedo = currentHistoryIndex < history.length - 1

  return (
    <ContextProvider
      value={{
        shapes,
        setShapes,
        setShapesWithHistory: updateShapes,
        previewLine,
        setPreviewLine,
        undo,
        redo,
        canUndo,
        canRedo,
      }}
    >
      {children}
    </ContextProvider>
  )
}
