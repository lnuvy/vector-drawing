import Konva from "konva"
import { useState } from "react"
import { useShapesContext } from "../contexts/shapes-context"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"

interface Point {
  x: number
  y: number
}

export const useCreateShapeEvent = () => {
  const [startPoint, setStartPoint] = useState<Point | null>(null)

  const [isLineDrawing, setIsLineDrawing] = useState(false)

  const { color, weight, tool } = useSelectToolContext()
  const { setCircles, setLines, setPreviewLine } = useShapesContext()

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
        const ellipse: Konva.EllipseConfig = {
          x: pos.x,
          y: pos.y,
          radiusX: 0,
          radiusY: 0,
          draggable: true,
          stroke: color,
          strokeWidth: weight,
        }

        setCircles(prev => [...prev, ellipse])
        break
      }

      /**
       * 직선
       */
      case Tool.SimpleLine: {
        const line: Konva.LineConfig = {
          points: [pos.x, pos.y],
        }

        setLines(prev => [...prev, line])
        setPreviewLine({
          points: [pos.x, pos.y],
        })
        setIsLineDrawing(true)
        break
      }
    }
  }

  const handleMouseMove = (e: Konva.KonvaEventObject<Event>) => {
    switch (tool) {
      /**
       * 원 그리기
       * shift 키를 누르지않으면 타원 가능, shift를 누르면 동그란 원으로 그림
       */
      case Tool.Circle:
        {
          const stage = e.target.getStage()
          const pos = stage?.getPointerPosition()
          if (!pos) return

          const { shiftKey } = e.evt as MouseEvent

          if (!startPoint) return
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
        break

      /**
       * 직선
       * MouseMove 에서는 previewLine 처리
       */
      case Tool.SimpleLine: {
        const stage = e.target.getStage()
        const pos = stage?.getPointerPosition()
        if (!pos) return

        if (!startPoint) return
        if (isLineDrawing) {
          const { x: startX, y: startY } = startPoint

          setPreviewLine({
            points: [startX, startY, pos.x, pos.y],
          })
        }
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

        setLines(prev => {
          const lastIndex = prev.length - 1
          return prev.map((line, index) =>
            index === lastIndex
              ? {
                  ...line,
                  points: line.points ? [...line.points, pos.x, pos.y] : [pos.x, pos.y],
                  stroke: color,
                  strokeWidth: weight,
                }
              : line,
          )
        })

        setPreviewLine(null)
        setIsLineDrawing(false)
        break
      }
    }
  }

  return { handleMouseDown, handleMouseMove, handleMouseUp }
}
