import { Stage } from "react-konva"
import { useCreateShapeEvent } from "../hooks/use-create-shape-event"
import CircleLayer from "./circle-layer"

const KonvaStage = () => {
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCreateShapeEvent("circle")

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight - 60}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <CircleLayer />
    </Stage>
  )
}

export default KonvaStage
