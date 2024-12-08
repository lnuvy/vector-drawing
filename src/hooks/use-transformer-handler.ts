import { useEffect, useRef, useState } from "react"
import Konva from "konva"
import { useShapesHistoryContext } from "@/contexts/shapes-history-context"
import { Tool } from "@/types"

/**
 * Transformer 컴포넌트를 적용해보았습니다.
 * redo, undo를 위해 context의 shapesWithHistory를 사용합니다.
 *
 * @see https://konvajs.org/docs/select_and_transform/Basic_demo.html
 */
export const useTransformerHandler = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const transformerRef = useRef<Konva.Transformer>(null)

  const { setShapesWithHistory } = useShapesHistoryContext()

  useEffect(() => {
    if (!transformerRef.current) return

    const stage = transformerRef.current.getStage()
    if (!stage) return

    const selectedNode = stage.findOne("#" + selectedId)
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode])
    } else {
      transformerRef.current.nodes([])
    }
  }, [selectedId])

  const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    const node = e.target
    const scaleX = node.scaleX()
    const scaleY = node.scaleY()

    setShapesWithHistory(prev =>
      prev.map(shape => {
        if (shape.id !== node.id()) return shape

        switch (shape.type) {
          case Tool.SimpleLine:
          case Tool.Spline: {
            const newPoints = [...(shape.points || [])]
            for (let i = 0; i < newPoints.length; i += 2) {
              newPoints[i] = newPoints[i] * scaleX
              newPoints[i + 1] = newPoints[i + 1] * scaleY
            }
            return {
              ...shape,
              points: newPoints,
              rotation: node.rotation(),
            }
          }

          case Tool.Circle: {
            return {
              ...shape,
              x: node.x(),
              y: node.y(),
              radiusX: shape.radiusX! * scaleX,
              radiusY: shape.radiusY! * scaleY,
              rotation: node.rotation(),
            }
          }

          case Tool.Rect: {
            return {
              ...shape,
              x: node.x(),
              y: node.y(),
              width: node.width() * scaleX,
              height: node.height() * scaleY,
              rotation: node.rotation(),
            }
          }

          case Tool.Polygon: {
            return {
              ...shape,
              x: node.x(),
              y: node.y(),
              radius: shape.radius! * Math.max(scaleX, scaleY),
              rotation: node.rotation(),
            }
          }

          default:
            return shape
        }
      }),
    )

    node.scaleX(1)
    node.scaleY(1)
  }

  return {
    transformerRef,
    selectedId,
    setSelectedId,
    handleTransformEnd,
  }
}
