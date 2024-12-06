import { useState } from "react"
import { createDynamicContext } from "../hooks/create-dynamic-context"
import type Konva from "konva"

interface ShapesContextProps {
  lines: Konva.LineConfig[]
  setLines: React.Dispatch<React.SetStateAction<Konva.LineConfig[]>>
  previewLine: Konva.LineConfig | null
  setPreviewLine: React.Dispatch<React.SetStateAction<Konva.LineConfig | null>>

  circles: Konva.EllipseConfig[]
  setCircles: React.Dispatch<React.SetStateAction<Konva.EllipseConfig[]>>
  rects: Konva.RectConfig[]
  setRects: React.Dispatch<React.SetStateAction<Konva.RectConfig[]>>
  polygons: Konva.RegularPolygonConfig[]
  setPolygons: React.Dispatch<React.SetStateAction<Konva.RegularPolygonConfig[]>>
}

const { ContextProvider, useContext } = createDynamicContext<ShapesContextProps>()

export const useShapesContext = useContext
export const ShapesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lines, setLines] = useState<Konva.LineConfig[]>([])
  const [circles, setCircles] = useState<Konva.EllipseConfig[]>([])
  const [rects, setRects] = useState<Konva.RectConfig[]>([])
  const [polygons, setPolygons] = useState<Konva.RegularPolygonConfig[]>([])

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
