import { useEffect, useState } from "react"
import { Ellipse, Layer, Line, Rect, RegularPolygon, Stage, Transformer } from "react-konva"
import Konva from "konva"
import { STORAGE_KEY } from "@/constants"
import { useSelectToolContext } from "@/contexts/select-tool-context"
import { useShapesHistoryContext } from "@/contexts/shapes-history-context"
import { getCanvasSize, getStorageStageSize, setStorage } from "@/functions/util"
import { useCreateShapeEvent } from "@/hooks/use-create-shape-event"
import { useTransformerHandler } from "@/hooks/use-transformer-handler"
import { Shape, Tool } from "@/types"
import SimpleLinePreview from "./simple-line-preview"

const KonvaStage = () => {
  const [stageSize] = useState(getStorageStageSize)

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCreateShapeEvent()
  const { shapes, setShapes, setShapesWithHistory } = useShapesHistoryContext()
  const { tool } = useSelectToolContext()

  const { transformerRef, setSelectedId, handleTransformEnd } = useTransformerHandler()

  const handleOutsideSelect = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      setSelectedId(null)
    }
  }

  // 약간의 야매
  useEffect(() => {
    const size = getStorageStageSize()
    if (!size) {
      setStorage(STORAGE_KEY.CANVAS_SIZE, JSON.stringify(getCanvasSize()))
    }
  }, [])

  /**
   * 도형 type별로 그룹화
   */
  const groupByShapeType = shapes.reduce(
    (acc, shape) => {
      const key = shape.type
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(shape)
      return acc
    },
    {} as Record<string, typeof shapes>,
  )

  const dragStartHandler = (shape: Shape) => {
    setShapes(prev => prev.map(s => ({ ...s, isDragging: s.id === shape.id })))
  }

  const dragEndHandler = (e: Konva.KonvaEventObject<Event>, shape: Shape) => {
    setShapesWithHistory(prev =>
      prev.map(s => {
        if (s.id !== shape.id) return s

        const updatedShape = { ...s, isDragging: false }

        switch (shape.type) {
          case Tool.SimpleLine:
          case Tool.Spline: {
            const newLine = { ...shape, isDragging: false }
            const node = e.target as Konva.Node
            const dx = node.x()
            const dy = node.y()
            newLine.points = shape.points?.map((coord, i) => {
              return coord + (i % 2 === 0 ? dx : dy)
            })
            node.position({ x: 0, y: 0 })
            return newLine
          }

          default: {
            updatedShape.x = e.target.x()
            updatedShape.y = e.target.y()
            return updatedShape
          }
        }
      }),
    )
  }

  return (
    <Stage
      width={stageSize.width}
      height={stageSize.height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleOutsideSelect}
    >
      {Object.entries(groupByShapeType).map(([type, shapes]) => {
        return (
          <Layer key={type}>
            <Transformer ref={transformerRef} />

            {shapes.map(shape => {
              const commonShapeProps = {
                id: shape.id,
                opacity: shape.isDragging ? 0.5 : 1,
                stroke: shape.stroke,
                strokeWidth: shape.strokeWidth,
                draggable: tool === Tool.Cursor,
                onClick: () => setSelectedId(shape.id),
                onDragStart: () => dragStartHandler(shape),
                onDragEnd: (e: Konva.KonvaEventObject<Event>) => dragEndHandler(e, shape),
                onTransformEnd: handleTransformEnd,
              }

              if (type === Tool.Spline || type === Tool.SimpleLine) {
                return <Line key={shape.id} points={shape.points} {...commonShapeProps} />
              }

              if (type === Tool.Circle) {
                return (
                  <Ellipse
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radiusX={shape.radiusX}
                    radiusY={shape.radiusY}
                    {...commonShapeProps}
                  />
                )
              }

              if (type === Tool.Rect) {
                return <Rect key={shape.id} {...shape} {...commonShapeProps} />
              }

              if (type === Tool.Polygon) {
                return (
                  <RegularPolygon
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    sides={shape.sides}
                    radius={shape.radius}
                    {...commonShapeProps}
                  />
                )
              }
            })}
          </Layer>
        )
      })}

      <SimpleLinePreview />
    </Stage>
  )
}

export default KonvaStage
