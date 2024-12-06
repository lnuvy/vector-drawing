import Konva from "konva"
import { useState } from "react"
import { AddDragging, useShapesContext } from "../contexts/shapes-context"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"
import { throttle } from "../functions/pure"

interface Point {
  x: number
  y: number
}

export const useCreateShapeEvent = () => {
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [isLineDrawing, setIsLineDrawing] = useState(false)

  const { color, weight, tool } = useSelectToolContext()
  const { setCircles, setRects, setLines, setPreviewLine } = useShapesContext()

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
      /**
       * 원
       */
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

        setCircles(prev => [...prev, { ...ellipse, id: String(prev.length), isDragging: false }])
        break
      }

      /**
       * 사각형
       */
      case Tool.Rect: {
        const rect: Konva.RectConfig = {
          x: pos.x,
          y: pos.y,
          draggable: true,
          stroke: color,
          strokeWidth: weight,
        }

        setRects(prev => [...prev, { ...rect, id: String(prev.length), isDragging: false }])
        break
      }

      /**
       * 다각형
       */
      case Tool.Polygon: {
        break
      }

      /**
       * 직선
       */
      case Tool.SimpleLine: {
        const line: Konva.LineConfig = {
          points: [pos.x, pos.y],
        }

        setLines(prev => [...prev, { ...line, id: String(prev.length), isDragging: false }])
        setPreviewLine({
          points: [pos.x, pos.y],
        })
        setIsLineDrawing(true)
        break
      }

      /**
       * 곡선 (자유롭게 그리기)
       */
      case Tool.Spline: {
        setIsLineDrawing(true)
        setLines(prev => [
          ...prev,
          {
            points: [pos.x, pos.y],
            id: String(prev.length),
            isDragging: false,
            stroke: color,
            strokeWidth: weight,
          },
        ])
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
       * 사각형 그리기
       */
      case Tool.Rect: {
        const stage = e.target.getStage()
        const pos = stage?.getPointerPosition()
        if (!pos || !startPoint) return

        const { shiftKey } = e.evt as MouseEvent

        const { x: startX, y: startY } = startPoint
        let width = pos.x - startX
        let height = pos.y - startY

        if (shiftKey) {
          const size = Math.max(Math.abs(width), Math.abs(height))
          width = width >= 0 ? size : -size
          height = height >= 0 ? size : -size
        }

        const updatedRect = {
          x: startX,
          y: startY,
          width,
          height,
        }
        setRects(prev => {
          const lastIndex = prev.length - 1
          return prev.map((rect, index) => (index === lastIndex ? { ...rect, ...updatedRect } : rect))
        })
        break
      }

      /**
       * 직선
       * MouseMove 에서는 previewLine 처리
       */
      case Tool.SimpleLine: {
        const stage = e.target.getStage()
        const pos = stage?.getPointerPosition()
        if (!pos || !isLineDrawing || !startPoint) return

        const { x: startX, y: startY } = startPoint
        setPreviewLine({
          points: [startX, startY, pos.x, pos.y],
        })
        break
      }

      /**
       * 곡선
       * points가 너무 많이 적재되는것을 막기위해 throttle 처리
       */
      case Tool.Spline: {
        const stage = e.target.getStage()
        const pos = stage?.getPointerPosition()
        if (!pos || !isLineDrawing || !startPoint) return

        const throttledSetLines = throttle((prev: AddDragging<Konva.LineConfig>[]) => {
          const lastIndex = prev.length - 1
          return prev.map((line, index) =>
            index === lastIndex
              ? { ...line, points: line.points ? [...line.points, pos.x, pos.y] : [pos.x, pos.y] }
              : line,
          )
        }, 100)
        setLines(throttledSetLines)
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
        setIsLineDrawing(false)
        setPreviewLine(null)
        break
      }

      case Tool.Spline: {
        setIsLineDrawing(false)
        break
      }
    }
  }

  return { handleMouseDown, handleMouseMove, handleMouseUp }
}
