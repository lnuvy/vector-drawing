import { useEffect } from "react"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"
import { isMac } from "../functions/util"
import { useShapesHistoryContext } from "../contexts/shapes-history-context"

export const useKeydownTools = () => {
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

      if (e.key.toLowerCase() === "u") setTool(Tool.Cursor)
      if (e.key.toLowerCase() === "l") setTool(Tool.SimpleLine)
      if (e.key.toLowerCase() === "s") setTool(Tool.Spline)
      if (e.key.toLowerCase() === "r") setTool(Tool.Rect)
      if (e.key.toLowerCase() === "c") setTool(Tool.Circle)
    }

    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [setTool, undo, redo])
}
