import { useEffect } from "react"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"

export const useKeydownTools = () => {
  const { setTool } = useSelectToolContext()

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "u") setTool(Tool.Cursor)
      if (e.key.toLowerCase() === "l") setTool(Tool.SimpleLine)
      if (e.key.toLowerCase() === "s") setTool(Tool.Spline)
      if (e.key.toLowerCase() === "r") setTool(Tool.Rect)
      if (e.key.toLowerCase() === "c") setTool(Tool.Circle)
    }

    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [setTool])
}
