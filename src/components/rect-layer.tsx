import { Layer, Rect } from "react-konva"
import { useShapesContext } from "../contexts/shapes-context"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"

const RectLayer = () => {
  const { tool } = useSelectToolContext()
  const { rects, setRects } = useShapesContext()

  return (
    <Layer>
      {rects.map((rect, i) => (
        <Rect
          key={i}
          {...rect}
          draggable={tool === Tool.Cursor}
          onDragStart={() => setRects(prev => prev.map(r => ({ ...r, isDragging: r.id === rect.id })))}
          onDragEnd={() => setRects(prev => prev.map(r => ({ ...r, isDragging: false })))}
          opacity={rect.isDragging ? 0.5 : 1}
        />
      ))}
    </Layer>
  )
}

export default RectLayer
