import { Ellipse, Layer } from "react-konva"
import { useShapesContext } from "../contexts/shapes-context"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"

const CircleLayer = () => {
  const { tool } = useSelectToolContext()
  const { circles } = useShapesContext()

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
          draggable={tool === Tool.Cursor}
        />
      ))}
    </Layer>
  )
}

export default CircleLayer
