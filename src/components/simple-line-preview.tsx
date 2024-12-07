import { Layer, Line } from "react-konva"
import { useShapesContext } from "../contexts/shapes-context"
import { useSelectToolContext } from "../contexts/select-tool-context"

const SimpleLinePreview = () => {
  const { previewLine } = useShapesContext()
  const { color, weight } = useSelectToolContext()

  const dashSize = Math.round(weight)

  if (!previewLine) return null
  return (
    <Layer>
      <Line points={previewLine.points} stroke={color} strokeWidth={weight} opacity={0.5} dash={[dashSize, dashSize]} />
    </Layer>
  )
}

export default SimpleLinePreview
