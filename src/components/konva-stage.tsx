import { Ellipse, Layer, Line, Rect, Stage } from "react-konva"
import { useCreateShapeEvent } from "../hooks/use-create-shape-event"
import { Shape, useShapesContext } from "../contexts/shapes-context"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"

const KonvaStage = () => {
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCreateShapeEvent()
  const { shapes, setShapes } = useShapesContext()
  const { tool } = useSelectToolContext()

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

  const dragEndHandler = () => {
    setShapes(prev => prev.map(s => ({ ...s, isDragging: false })))
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight - 72}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {Object.entries(groupByShapeType).map(([type, shapes]) => {
        return (
          <Layer key={type}>
            {shapes.map(shape => {
              if (type === Tool.Spline || type === Tool.SimpleLine) {
                return (
                  <Line
                    key={shape.id}
                    points={shape.points}
                    stroke={shape.stroke}
                    opacity={shape.isDragging ? 0.5 : 1}
                    strokeWidth={shape.strokeWidth}
                    draggable={tool === Tool.Cursor}
                    onDragStart={() => dragStartHandler(shape)}
                    onDragEnd={dragEndHandler}
                  />
                )
              }

              if (type === Tool.Circle) {
                return (
                  <Ellipse
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radiusX={shape.radiusX}
                    radiusY={shape.radiusY}
                    stroke={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                    opacity={shape.isDragging ? 0.5 : 1}
                    draggable={tool === Tool.Cursor}
                    onDragStart={() => dragStartHandler(shape)}
                    onDragEnd={dragEndHandler}
                  />
                )
              }

              if (type === Tool.Rect) {
                return (
                  <Rect
                    key={shape.id}
                    {...shape}
                    draggable={tool === Tool.Cursor}
                    onDragStart={() => dragStartHandler(shape)}
                    onDragEnd={dragEndHandler}
                  />
                )
              }
            })}
          </Layer>
        )
      })}
    </Stage>
  )
}

export default KonvaStage
