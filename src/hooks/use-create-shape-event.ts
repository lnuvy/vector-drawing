import Konva from "konva"
import { Tool } from "../App"
import { useState } from "react"
import { useShapesContext } from "../contexts/shapes-context"

interface Point {
  x: number
  y: number
}

export const useCreateShapeEvent = (tool: Tool) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPoint, setStartPoint] = useState<Point | null>(null)

  const { setCircles } = useShapesContext()

  const handleMouseDown = (e: Konva.KonvaEventObject<Event>) => {
    const stage = e.target.getStage()

    if (!stage) {
      alert("stage가 없습니다.")
      return
    }

    const pos = stage.getPointerPosition()
    if (!pos) {
      alert("pos가 없습니다.")
      return
    }

    setIsDrawing(true)
    setStartPoint({ x: pos.x, y: pos.y })

    switch (tool) {
      case "circle": {
        const ellipse: Konva.EllipseConfig = {
          x: pos.x,
          y: pos.y,
          radiusX: 0,
          radiusY: 0,
          draggable: true,
        }

        setCircles(prev => [...prev, ellipse])

        break
      }
    }
  }

  const handleMouseMove = (e: Konva.KonvaEventObject<Event>) => {
    if (!isDrawing || !startPoint) return

    const stage = e.target.getStage()
    const pos = stage?.getPointerPosition()
    if (!pos) return

    const { shiftKey } = e.evt as MouseEvent

    const { x: startX, y: startY } = startPoint
    const width = pos.x - startX
    const height = pos.y - startY
    const radiusX = Math.abs(width) / 2
    const radiusY = Math.abs(height) / 2

    const updatedEllipse = {
      x: startX + width / 2,
      y: startY + height / 2,
      radiusX: shiftKey ? Math.max(radiusX, radiusY) : radiusX,
      radiusY: shiftKey ? Math.max(radiusX, radiusY) : radiusY,
    }

    setCircles(prev => {
      const lastIndex = prev.length - 1
      return prev.map((circle, index) => (index === lastIndex ? { ...circle, ...updatedEllipse } : circle))
    })
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    setStartPoint(null)
  }

  return { handleMouseDown, handleMouseMove, handleMouseUp }
}
