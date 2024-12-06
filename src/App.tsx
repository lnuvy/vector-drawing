import { ShapesContextProvider } from "./contexts/shapes-context"
import KonvaStage from "./components/konva-stage"
import { useState } from "react"
import { SelectToolContextProvider, Tool } from "./contexts/select-tool-context"
import ToolsHeader from "./components/tools-header"

function App() {
  const [tool, setTool] = useState<Tool>(Tool.Cursor)

  return (
    <div className="relative bg-gray-100">
      <SelectToolContextProvider value={{ tool, setTool }}>
        <ToolsHeader />
        <div className="rounded-lg bg-white shadow-sm">
          <ShapesContextProvider>
            <KonvaStage />
          </ShapesContextProvider>
        </div>
      </SelectToolContextProvider>
    </div>
  )
}

export default App
