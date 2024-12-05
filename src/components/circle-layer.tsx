import { Ellipse, Layer } from "react-konva"
import { useShapesContext } from "../contexts/shapes-context"

const CircleLayer = () => {
  const { circles } = useShapesContext()
  // const [isStageReady, setIsStageReady] = useState(false)
  // const [isDrawing, setIsDrawing] = useState(false)
  // const [startPoint, setStartPoint] = useState<Point | null>(null)

  console.log(`circles`, circles)
  return (
    <Layer>
      {/* <Ellipse
        x={0}
        y={0}
        radiusX={200}
        radiusY={100}
        stroke="#000"
        strokeWidth={2}
        draggable
        onDragStart={() => {}}
        onDragEnd={() => {}}
      /> */}

      {circles.map((ellipse, i) => (
        <Ellipse
          key={i}
          x={ellipse.x}
          y={ellipse.y}
          radiusX={ellipse.radiusX}
          radiusY={ellipse.radiusY}
          stroke="#000"
          strokeWidth={2}
          draggable
          onDragStart={e => {
            console.log(e)
          }}
        />
      ))}
    </Layer>
  )
}

export default CircleLayer
