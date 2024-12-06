import { Layer, Line } from "react-konva"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"
import { useShapesContext } from "../contexts/shapes-context"

const LineLayer = () => {
  const { tool } = useSelectToolContext()
  const { lines, previewLine } = useShapesContext()

  return (
    <Layer>
      {lines.map((line, i) => (
        <Line key={i} points={line.points} stroke="#000" strokeWidth={2} draggable={tool === Tool.Cursor} />
      ))}

      {/* 미리보기 선 */}
      {previewLine && <Line points={previewLine.points} stroke="#000" strokeWidth={2} opacity={0.5} dash={[5, 5]} />}
    </Layer>
  )
}

export default LineLayer
