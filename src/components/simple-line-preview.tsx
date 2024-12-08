import { Layer, Line } from "react-konva"
import { useSelectToolContext } from "@/contexts/select-tool-context"
import { useShapesHistoryContext } from "@/contexts/shapes-history-context"

const SimpleLinePreview = () => {
  const { previewLine } = useShapesHistoryContext()
  const { color, weight } = useSelectToolContext()

  if (!previewLine) return null
  return (
    <Layer>
      <Line points={previewLine.points} stroke={color} strokeWidth={weight} opacity={0.5} dash={[weight, weight]} />
    </Layer>
  )
}

export default SimpleLinePreview
