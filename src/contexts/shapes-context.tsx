import { useState } from "react"
import { createDynamicContext } from "../hooks/create-dynamic-context"
import type Konva from "konva"

interface ShapesContextProps {
  lines: Konva.LineConfig[]
  setLines: React.Dispatch<React.SetStateAction<Konva.LineConfig[]>>
  circles: Konva.EllipseConfig[]
  setCircles: React.Dispatch<React.SetStateAction<Konva.EllipseConfig[]>>
  rects: Konva.RectConfig[]
  setRects: React.Dispatch<React.SetStateAction<Konva.RectConfig[]>>
  polygons: Konva.RegularPolygonConfig[]
  setPolygons: React.Dispatch<React.SetStateAction<Konva.RegularPolygonConfig[]>>
}

const { ContextProvider, useContext } = createDynamicContext<ShapesContextProps>()

// eslint-disable-next-line react-refresh/only-export-components
export const useShapesContext = useContext
export const ShapesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lines, setLines] = useState<Konva.LineConfig[]>([])
  const [circles, setCircles] = useState<Konva.EllipseConfig[]>([])
  const [rects, setRects] = useState<Konva.RectConfig[]>([])
  const [polygons, setPolygons] = useState<Konva.RegularPolygonConfig[]>([])

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
      }}
    >
      {children}
    </ContextProvider>
  )
}
