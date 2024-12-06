import { Stage } from "react-konva"
import { useCreateShapeEvent } from "../hooks/use-create-shape-event"
import CircleLayer from "./circle-layer"
import LineLayer from "./line-layer"
import RectLayer from "./rect-layer"

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
      <RectLayer />
    </Stage>
  )
}

export default KonvaStage
