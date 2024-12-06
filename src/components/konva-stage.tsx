import { Stage } from "react-konva"
import { useCreateShapeEvent } from "../hooks/use-create-shape-event"
import CircleLayer from "./circle-layer"
import LineLayer from "./line-layer"

const KonvaStage = () => {
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCreateShapeEvent()

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight - 72}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <CircleLayer />
      <LineLayer />
    </Stage>
  )
}

export default KonvaStage
