import { useState } from "react"
import {
  Circle,
  Hand,
  LucideProps,
  PenLine,
  Pentagon,
  RectangleHorizontal,
  Redo,
  RefreshCcw,
  Spline,
  Undo,
} from "lucide-react"
import UnderlineText from "@/components/header/underline-text"
import { useSelectToolContext } from "@/contexts/select-tool-context"
import { useShapesHistoryContext } from "@/contexts/shapes-history-context"
import { Tool } from "@/types"

interface MenuItem {
  id: string
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  label: string | React.ReactNode
  tool: Tool | null
  onClick?: () => void
  disabled: boolean
  split: boolean
}

export const useToolsHeaderMenu = () => {
  const { undo, redo, canUndo, canRedo, reset } = useShapesHistoryContext()
  const { setTool } = useSelectToolContext()

  const [polygonInputShow, setPolygonInputShow] = useState(false)

  const menus: MenuItem[] = [
    {
      id: "reset",
      Icon: RefreshCcw,
      label: "Reset",
      tool: null,
      split: false,
      disabled: false,
      onClick: reset,
    },
    {
      id: "undo",
      Icon: Undo,
      label: "Undo",
      tool: null,
      split: false,
      disabled: !canUndo,
      onClick: undo,
    },
    {
      id: "redo",
      Icon: Redo,
      label: "Redo",
      tool: null,
      split: true,
      disabled: !canRedo,
      onClick: redo,
    },
    {
      id: "cursor",
      Icon: Hand,
      label: <UnderlineText text="Cursor" underWord="u" />,
      tool: Tool.Cursor,
      split: false,
      disabled: false,
      onClick: () => setTool(Tool.Cursor),
    },
    {
      id: "line",
      label: <UnderlineText text="Line" underWord="L" />,
      tool: Tool.SimpleLine,
      Icon: PenLine,
      split: false,
      disabled: false,
      onClick: () => setTool(Tool.SimpleLine),
    },
    {
      id: "spline",
      label: <UnderlineText text="Spline" underWord="S" />,
      tool: Tool.Spline,
      Icon: Spline,
      split: false,
      disabled: false,
      onClick: () => setTool(Tool.Spline),
    },
    {
      id: "circle",
      label: <UnderlineText text="Circle" underWord="C" />,
      tool: Tool.Circle,
      Icon: Circle,
      split: false,
      disabled: false,
      onClick: () => setTool(Tool.Circle),
    },
    {
      id: "rect",
      label: <UnderlineText text="Rect" underWord="R" />,
      tool: Tool.Rect,
      Icon: RectangleHorizontal,
      split: false,
      disabled: false,
      onClick: () => setTool(Tool.Rect),
    },
    {
      id: "polygon",
      label: <UnderlineText text="Polygon" underWord="P" />,
      tool: Tool.Polygon,
      Icon: Pentagon,
      split: false,
      disabled: false,
      onClick: () => {
        setTool(Tool.Polygon)
        setPolygonInputShow(true)
      },
    },
  ]

  return { menus, polygonInputShow, setPolygonInputShow }
}
