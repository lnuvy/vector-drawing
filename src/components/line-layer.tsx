import { Layer, Line } from "react-konva"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"
import { useShapesContext } from "../contexts/shapes-context"

const LineLayer = () => {
  const { tool, color, weight } = useSelectToolContext()
  const { lines, setLines, previewLine } = useShapesContext()

  return (
    <Layer>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke={line.stroke}
          opacity={line.isDragging ? 0.5 : 1}
          strokeWidth={line.strokeWidth}
          draggable={tool === Tool.Cursor}
          onDragStart={() => setLines(prev => prev.map(l => ({ ...l, isDragging: l.id === line.id })))}
          onDragEnd={() => setLines(prev => prev.map(l => ({ ...l, isDragging: false })))}
        />
      ))}

      {/* 미리보기 선 */}
      {previewLine && (
        <Line points={previewLine.points} stroke={color} strokeWidth={weight} opacity={0.5} dash={[20, 20]} />
      )}
    </Layer>
  )
}

export default LineLayer
