import { useState } from "react"
import { createDynamicContext } from "../hooks/create-dynamic-context"
import type Konva from "konva"
import { Tool } from "./select-tool-context"

export type AddDragging<T> = T & { id: string; isDragging: boolean }

export type Shape =
  | (AddDragging<Konva.LineConfig> & { type: Tool.SimpleLine | Tool.Spline })
  | (AddDragging<Konva.EllipseConfig> & { type: Tool.Circle })
  | (AddDragging<Konva.RectConfig> & { type: Tool.Rect })
  | (AddDragging<Konva.RegularPolygonConfig> & { type: Tool.Polygon })

interface ShapesContextProps {
  shapes: Shape[]
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
  previewLine: Konva.LineConfig | null
  setPreviewLine: React.Dispatch<React.SetStateAction<Konva.LineConfig | null>>
}

const { ContextProvider, useContext } = createDynamicContext<ShapesContextProps>()

export const useShapesContext = useContext
export const ShapesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [previewLine, setPreviewLine] = useState<Konva.LineConfig | null>(null)

  // const [history, setHistory] = useState<Shape[]>([])

  return (
    <ContextProvider
      value={{
        shapes,
        setShapes,
        previewLine,
        setPreviewLine,
      }}
    >
      {children}
    </ContextProvider>
  )
}
