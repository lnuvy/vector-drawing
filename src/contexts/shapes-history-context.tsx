import { useState } from "react"
import type Konva from "konva"
import { STORAGE_KEY, UNDO_MAX_COUNT } from "@/constants"

import { clearStorageCanvasState, getStorage, getStorageParsed, setStorageCanvasState } from "@/functions/util"
import { createDynamicContext } from "@/hooks/create-dynamic-context"
import { Shape } from "@/types"

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
  reset: () => void
}

const { ContextProvider, useContext } = createDynamicContext<ShapesHistoryContextProps>()

export const useShapesHistoryContext = useContext

export const ShapesHistoryContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [shapes, setShapes] = useState<Shape[]>(() => {
    return getStorageParsed(STORAGE_KEY.SHAPES) ?? []
  })

  const [previewLine, setPreviewLine] = useState<Konva.LineConfig | null>(null)

  const [history, setHistory] = useState<Shape[][]>(() => {
    return getStorageParsed(STORAGE_KEY.UNDO_HISTORY) ?? [[]]
  })
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(() => {
    return Number(getStorage(STORAGE_KEY.HISTORY_INDEX) ?? 0)
  })

  /**
   * shapes 업데이트와 동시에 history를 업데이트하는 함수
   * use-create-shape-event에서 MouseUp 이벤트 발생시 명시적으로 실행
   */
  const updateShapes = (updater: Shape[] | ((prev: Shape[]) => Shape[])) => {
    setShapes(prev => {
      const newShapes = typeof updater === "function" ? updater(prev) : updater

      const newHistory = history.slice(0, currentHistoryIndex + 1)
      newHistory.push(newShapes)

      if (newHistory.length > UNDO_MAX_COUNT) {
        newHistory.shift()
      }
      setHistory(newHistory)
      setCurrentHistoryIndex(newHistory.length - 1)
      setStorageCanvasState({ shapes: newShapes, history: newHistory, historyIndex: newHistory.length - 1 })

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

  const reset = () => {
    if (window.confirm("모두 초기화 할까요?!")) {
      setShapes([])
      setHistory([[]])
      setCurrentHistoryIndex(0)
      clearStorageCanvasState()
    }
  }

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
        reset,
      }}
    >
      {children}
    </ContextProvider>
  )
}
