import { useRef } from "react"
import { Fragment } from "react/jsx-runtime"
import { useSelectToolContext } from "@/contexts/select-tool-context"
import { cn } from "@/functions/cn"
import { useClickOutside } from "@/hooks/use-click-outside"
import { useKeyBindingTools } from "@/hooks/use-key-binding-tools"
import { useToolsHeaderMenu } from "@/hooks/use-tools-header-menu"

const ToolsHeader = () => {
  const { menus, polygonInputShow, setPolygonInputShow } = useToolsHeaderMenu()
  const { tool, sides, setSides } = useSelectToolContext()
  useKeyBindingTools()

  const inRef = useRef<HTMLDivElement>(null)
  const exceptRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useClickOutside({
    inRef,
    exceptRef,
    handler: () => {
      if (sides === "") {
        window.alert("3~9 사이의 숫자를 입력해주세요.")
        setTimeout(() => inputRef.current?.focus())
        return
      }
      setPolygonInputShow(false)
    },
  })

  return (
    <section className="fixed right-0 top-0 z-10 border border-gray-300 bg-white shadow-md">
      <div className="relative flex flex-col items-center gap-2 px-2 py-1 md:flex-row">
        {menus.map(menu => (
          <Fragment key={menu.id}>
            <button
              ref={menu.id === "polygon" ? exceptRef : undefined}
              onClick={menu.onClick}
              disabled={menu.disabled}
              className={cn("px-1.5 min-w-16 rounded-1 transition-colors", {
                "bg-gray-300": tool === menu.tool,
                "md:hover:bg-gray-200": !menu.disabled && tool !== menu.tool,
                "cursor-not-allowed opacity-50": menu.disabled,
              })}
            >
              <div className="flex items-center justify-center p-1">
                <menu.Icon />
              </div>
              <p className="text-sm text-gray-700">{menu.label}</p>
            </button>

            {menu.split && <div className="hidden h-8 w-px bg-gray-300 md:block" />}
          </Fragment>
        ))}

        <div
          ref={inRef}
          className={cn(
            "absolute animate-translate-fade-in -bottom-24 right-0 w-20 h-24 p-4 border rounded-1 border-gray-300",
            {
              block: polygonInputShow,
              hidden: !polygonInputShow,
            },
          )}
        >
          <label>
            꼭짓점
            <input
              ref={inputRef}
              value={sides}
              onChange={e => {
                const { value } = e.target
                if (value === "" || /^[3-9]$/.test(value)) {
                  setSides(value)
                }
              }}
              type="text"
              className="mt-1 w-full rounded-1 border border-gray-300 px-1 text-right"
            />
          </label>
        </div>
      </div>
    </section>
  )
}

export default ToolsHeader
