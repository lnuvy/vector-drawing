import { Ellipse, Layer } from "react-konva"
import { useShapesContext } from "../contexts/shapes-context"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"

const CircleLayer = () => {
  const { tool } = useSelectToolContext()
  const { circles, setCircles } = useShapesContext()

  return (
    <Layer>
      {circles.map((ellipse, i) => (
        <Ellipse
          key={i}
          x={ellipse.x}
          y={ellipse.y}
          radiusX={ellipse.radiusX}
          radiusY={ellipse.radiusY}
          stroke={ellipse.stroke}
          strokeWidth={ellipse.strokeWidth}
          opacity={ellipse.isDragging ? 0.5 : 1}
          draggable={tool === Tool.Cursor}
          onDragStart={() => setCircles(prev => prev.map(c => ({ ...c, isDragging: c.id === ellipse.id })))}
          onDragEnd={() => setCircles(prev => prev.map(c => ({ ...c, isDragging: false })))}
        />
      ))}
    </Layer>
  )
}

export default CircleLayer
