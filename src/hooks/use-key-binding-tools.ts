import { useEffect } from "react"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"
import { isMac } from "../functions/util"
import { useShapesHistoryContext } from "../contexts/shapes-history-context"

export const useKeyBindingTools = () => {
  const { setTool } = useSelectToolContext()
  const { undo, redo } = useShapesHistoryContext()

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const modifier = isMac() ? e.metaKey : e.ctrlKey
      if (modifier && e.key.toLowerCase() === "z") {
        e.preventDefault()
        if (e.shiftKey) redo()
        else undo()
      }

      if (e.key.toLowerCase() === "u" || e.key === "ㅕ") setTool(Tool.Cursor)
      if (e.key.toLowerCase() === "l" || e.key === "ㅣ") setTool(Tool.SimpleLine)
      if (e.key.toLowerCase() === "s" || e.key === "ㄴ") setTool(Tool.Spline)
      if (e.key.toLowerCase() === "r" || e.key === "ㄱ") setTool(Tool.Rect)
      if (e.key.toLowerCase() === "c" || e.key === "ㅊ") setTool(Tool.Circle)
    }

    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [setTool, undo, redo])
}