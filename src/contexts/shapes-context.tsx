import { useState } from "react"
import { createDynamicContext } from "../hooks/create-dynamic-context"
import type Konva from "konva"

export type AddDragging<T> = T & { id: string; isDragging: boolean }

interface ShapesContextProps {
  lines: AddDragging<Konva.LineConfig>[]
  setLines: React.Dispatch<React.SetStateAction<AddDragging<Konva.LineConfig>[]>>
  previewLine: Konva.LineConfig | null
  setPreviewLine: React.Dispatch<React.SetStateAction<Konva.LineConfig | null>>

  circles: AddDragging<Konva.EllipseConfig>[]
  setCircles: React.Dispatch<React.SetStateAction<AddDragging<Konva.EllipseConfig>[]>>
  rects: AddDragging<Konva.RectConfig>[]
  setRects: React.Dispatch<React.SetStateAction<AddDragging<Konva.RectConfig>[]>>
  polygons: AddDragging<Konva.RegularPolygonConfig>[]
  setPolygons: React.Dispatch<React.SetStateAction<AddDragging<Konva.RegularPolygonConfig>[]>>
}

const { ContextProvider, useContext } = createDynamicContext<ShapesContextProps>()

export const useShapesContext = useContext
export const ShapesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lines, setLines] = useState<AddDragging<Konva.LineConfig>[]>([])
  const [circles, setCircles] = useState<AddDragging<Konva.EllipseConfig>[]>([])
  const [rects, setRects] = useState<AddDragging<Konva.RectConfig>[]>([])
  const [polygons, setPolygons] = useState<AddDragging<Konva.RegularPolygonConfig>[]>([])

  const [previewLine, setPreviewLine] = useState<Konva.LineConfig | null>(null)

  return (
    <ContextProvider
      value={{
        lines,
        setLines,
        circles,
        setCircles,
        rects,
        setRects,
        polygons,
        setPolygons,
        previewLine,
        setPreviewLine,
      }}
    >
      {children}
    </ContextProvider>
  )
}
