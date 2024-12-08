import { useState } from "react"
import Konva from "konva"
import { useSelectToolContext } from "@/contexts/select-tool-context"
import { useShapesHistoryContext } from "@/contexts/shapes-history-context"
import { Point, Shape, Tool } from "@/types"

/** ------------------------------------------------------------------------------
 * 
 * 모든 도형의 생성을 관리하는 공용 훅입니다.
 * 
 * @return {
 *   KonvaNodeEvents.onMouseDown,
 *   KonvaNodeEvents.onMouseMove,
 *   KonvaNodeEvents.onMouseUp
 * }
 * 
 * @comment 만약 점점 요구사항이 많아지고 사이즈가 커지면 인자로 선택된 툴 종류를 받아서 각각 분리해서 관리하는 것이 좋을 것 같습니다.
 * 
 ------------------------------------------------------------------------------ */
export const useCreateShapeEvent = () => {
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [isLineDrawing, setIsLineDrawing] = useState(false)

  const { color, weight, tool } = useSelectToolContext()
  const { shapes, setShapes, setShapesWithHistory, setPreviewLine } = useShapesHistoryContext()

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

    setStartPoint({ x: pos.x, y: pos.y })

    switch (tool) {
      case Tool.Circle: {
        const newShape: Shape = {
          type: Tool.Circle,
          id: String(shapes.length),
          isDragging: false,
          x: pos.x,
          y: pos.y,
          radiusX: 0,
          radiusY: 0,
          draggable: true,
          stroke: color,
          strokeWidth: weight,
        }
        setShapes(prev => [...prev, newShape])
        break
      }

      case Tool.Rect: {
        const newShape: Shape = {
          type: Tool.Rect,
          id: String(shapes.length),
          isDragging: false,
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
          stroke: color,
          strokeWidth: weight,
        }
        setShapes(prev => [...prev, newShape])
        break
      }

      case Tool.SimpleLine: {
        const newShape: Shape = {
          type: Tool.SimpleLine,
          id: String(shapes.length),
          isDragging: false,
          points: [pos.x, pos.y],
          stroke: color,
          strokeWidth: weight,
        }
        setShapes(prev => [...prev, newShape])
        setPreviewLine({
          points: [pos.x, pos.y],
        })
        setIsLineDrawing(true)
        break
      }

      case Tool.Spline: {
        const newShape: Shape = {
          type: Tool.Spline,
          id: String(shapes.length),
          isDragging: false,
          points: [pos.x, pos.y],
          stroke: color,
          strokeWidth: weight,
        }
        setShapes(prev => [...prev, newShape])
        setIsLineDrawing(true)
        break
      }
    }
  }

  const handleMouseMove = (e: Konva.KonvaEventObject<Event>) => {
    const stage = e.target.getStage()
    const pos = stage?.getPointerPosition()
    if (!pos || !startPoint) return

    switch (tool) {
      case Tool.Circle: {
        const { shiftKey } = e.evt as MouseEvent
        const { x: startX, y: startY } = startPoint
        const width = pos.x - startX
        const height = pos.y - startY
        const radiusX = Math.abs(width) / 2
        const radiusY = Math.abs(height) / 2

        setShapes(prev => {
          const lastShape = prev[prev.length - 1]
          if (lastShape?.type !== Tool.Circle) return prev

          return prev.map((shape, index) =>
            index === prev.length - 1
              ? {
                  ...shape,
                  x: startX + width / 2,
                  y: startY + height / 2,
                  radiusX: shiftKey ? Math.max(radiusX, radiusY) : radiusX,
                  radiusY: shiftKey ? Math.max(radiusX, radiusY) : radiusY,
                }
              : shape,
          )
        })
        break
      }

      case Tool.Rect: {
        const { shiftKey } = e.evt as MouseEvent
        const { x: startX, y: startY } = startPoint
        let width = pos.x - startX
        let height = pos.y - startY

        if (shiftKey) {
          const size = Math.max(Math.abs(width), Math.abs(height))
          width = width >= 0 ? size : -size
          height = height >= 0 ? size : -size
        }

        setShapes(prev => {
          const lastShape = prev[prev.length - 1]
          if (lastShape?.type !== Tool.Rect) return prev

          return prev.map((shape, index) =>
            index === prev.length - 1
              ? {
                  ...shape,
                  width,
                  height,
                }
              : shape,
          )
        })
        break
      }

      case Tool.SimpleLine: {
        if (!isLineDrawing) return
        const { x: startX, y: startY } = startPoint
        setPreviewLine({
          points: [startX, startY, pos.x, pos.y],
        })
        break
      }

      case Tool.Spline: {
        if (!isLineDrawing) return
        setShapes(prev => {
          const lastShape = prev[prev.length - 1]
          if (lastShape?.type !== Tool.Spline) return prev

          return prev.map((shape, index) =>
            index === prev.length - 1
              ? {
                  ...shape,
                  points: shape.points ? [...shape.points, pos.x, pos.y] : [pos.x, pos.y],
                }
              : shape,
          )
        })
        break
      }
    }
  }

  const handleMouseUp = (e: Konva.KonvaEventObject<Event>) => {
    setStartPoint(null)

    switch (tool) {
      case Tool.SimpleLine: {
        const stage = e.target.getStage()
        const pos = stage?.getPointerPosition()
        if (!pos) return

        setShapesWithHistory(prev => {
          const lastShape = prev[prev.length - 1]
          if (lastShape?.type !== Tool.SimpleLine) return prev

          return prev.map((shape, index) =>
            index === prev.length - 1
              ? {
                  ...shape,
                  points: shape.points ? [...shape.points, pos.x, pos.y] : [pos.x, pos.y],
                }
              : shape,
          )
        })
        setIsLineDrawing(false)
        setPreviewLine(null)
        break
      }

      case Tool.Circle:
      case Tool.Rect:
      case Tool.Spline:
        setShapesWithHistory(prev => {
          const lastShape = prev[prev.length - 1]
          if (lastShape?.type !== Tool.Spline) return prev

          return prev.map((shape, index) => (index === prev.length - 1 ? { ...shape } : shape))
        })
        setIsLineDrawing(false)
    }
  }

  return { handleMouseDown, handleMouseMove, handleMouseUp }
}
