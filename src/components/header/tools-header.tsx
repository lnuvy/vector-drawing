import { Fragment } from "react/jsx-runtime"
import { Circle, Hand, PenLine, Pentagon, RectangleHorizontal, Redo, Spline, Undo } from "lucide-react"
import { Tool, useSelectToolContext } from "../../contexts/select-tool-context"
import { cn } from "../../functions/cn"
import { useKeydownTools } from "../../hooks/use-keydown-tools"

const ToolsHeader = () => {
  const { tool, setTool } = useSelectToolContext()

  useKeydownTools()

  return (
    <section className="fixed right-0 top-0 z-10 border border-gray-300 bg-white shadow-md">
      <div className="flex flex-col items-center gap-2 px-2 py-1 md:flex-row">
        {HEADER_MENUS.map(menu => (
          <Fragment key={menu.id}>
            <button
              onClick={() => {
                if (menu.type) setTool(menu.type)
              }}
              className={cn("px-1.5 min-w-16 rounded-1 transition-colors", {
                "bg-gray-300": tool === menu.type,
                "md:hover:bg-gray-200": tool !== menu.type,
              })}
            >
              <div className="flex items-center justify-center p-1">
                <menu.Icon />
              </div>
              <p className="text-sm text-gray-700">{menu.name}</p>
            </button>

            {menu.split && <div className="hidden h-8 w-px bg-gray-300 md:block" />}
          </Fragment>
        ))}
      </div>
    </section>
  )
}

export default ToolsHeader

const UnderlineText = ({ text, underWord }: { text: string; underWord: string }) => {
  return text.split(underWord).map((word, index) => (
    <Fragment key={word}>
      {word}
      {index !== text.split(underWord).length - 1 && <span className="underline">{underWord}</span>}
    </Fragment>
  ))
}

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
    id: 5,
    name: <UnderlineText text="Cursor" underWord="u" />,
    type: Tool.Cursor,
    Icon: Hand,
    split: false,
  },

  {
    id: 6,
    name: <UnderlineText text="Line" underWord="L" />,
    type: Tool.SimpleLine,
    Icon: PenLine,
    split: false,
  },
  {
    id: 7,
    name: <UnderlineText text="Spline" underWord="S" />,
    type: Tool.Spline,
    Icon: Spline,
    split: false,
  },
  {
    id: 8,
    name: <UnderlineText text="Circle" underWord="C" />,
    type: Tool.Circle,
    Icon: Circle,
    split: false,
  },
  {
    id: 9,
    name: <UnderlineText text="Rect" underWord="R" />,
    type: Tool.Rect,
    Icon: RectangleHorizontal,
    split: false,
  },
  {
    id: 10,
    name: <UnderlineText text="Polygon" underWord="P" />,
    type: Tool.Polygon,
    Icon: Pentagon,
    split: false,
  },
]
