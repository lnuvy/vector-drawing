import { Fragment } from "react/jsx-runtime"
import { useSelectToolContext } from "../../contexts/select-tool-context"
import { cn } from "../../functions/cn"
import { useKeyBindingTools } from "../../hooks/use-key-binding-tools"
import { useToolsHeaderMenu } from "../../hooks/use-tools-header-menu"

const ToolsHeader = () => {
  const { menus } = useToolsHeaderMenu()
  const { tool } = useSelectToolContext()
  useKeyBindingTools()

  return (
    <section className="fixed right-0 top-0 z-10 border border-gray-300 bg-white shadow-md">
      <div className="flex flex-col items-center gap-2 px-2 py-1 md:flex-row">
        {menus.map(menu => (
          <Fragment key={menu.id}>
            <button
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
      </div>
    </section>
  )
}

export default ToolsHeader
