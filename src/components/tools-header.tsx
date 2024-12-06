import { Fragment } from "react/jsx-runtime"
import { Bold, Circle, Hand, Palette, PenLine, Pentagon, RectangleHorizontal, Redo, Spline, Undo } from "lucide-react"
import { Tool, useSelectToolContext } from "../contexts/select-tool-context"
import { cn } from "../functions/cn"

const ToolsHeader = () => {
  const { tool, setTool } = useSelectToolContext()

  return (
    <header className="h-[60px]">
      <div className="fixed right-0 top-0 border border-gray-300 shadow-md">
        <div className="flex items-center gap-2 md:gap-3">
          {HEADER_MENUS.map(menu => (
            <Fragment key={menu.id}>
              <button
                onClick={() => {
                  if (menu.type) setTool(menu.type)
                }}
                className={cn("px-1.5", {
                  "bg-gray-300": tool === menu.type,
                  "md:hover:bg-gray-200": tool !== menu.type,
                })}
              >
                <div className="flex items-center justify-center p-1">
                  <menu.Icon />
                </div>
                <p className="text-sm text-gray-700">{menu.name}</p>
              </button>

              {menu.split && <div className="h-8 w-px bg-gray-300" />}
            </Fragment>
          ))}
        </div>
      </div>
    </header>
  )
}

export default ToolsHeader

const HEADER_MENUS = [
  {
    id: 1,
    name: "Undo",
    type: null,
    Icon: Undo,
    split: false,
  },
  {
    id: 2,
    name: "Redo",
    type: null,
    Icon: Redo,
    split: true,
  },

  {
    id: 3,
    name: "Color",
    type: null,
    Icon: Palette,
    split: false,
  },
  {
    id: 4,
    name: "Weight",
    type: null,
    Icon: Bold,
    split: true,
  },
  {
    id: 5,
    name: "Cursor",
    type: Tool.Cursor,
    Icon: Hand,
    split: false,
  },

  {
    id: 6,
    name: "Line",
    type: Tool.SimpleLine,
    Icon: PenLine,
    split: false,
  },
  {
    id: 7,
    name: "Spline",
    type: Tool.Spline,
    Icon: Spline,
    split: false,
  },
  {
    id: 8,
    name: "Circle",
    type: Tool.Circle,
    Icon: Circle,
    split: false,
  },
  {
    id: 9,
    name: "Rect",
    type: Tool.Rect,
    Icon: RectangleHorizontal,
    split: false,
  },
  {
    id: 10,
    name: "Polygon",
    type: Tool.Polygon,
    Icon: Pentagon,
    split: true,
  },
]
