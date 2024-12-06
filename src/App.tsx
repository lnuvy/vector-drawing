import { ShapesContextProvider } from "./contexts/shapes-context"
import KonvaStage from "./components/konva-stage"
import { SelectToolContextProvider } from "./contexts/select-tool-context"
import ToolsHeader from "./components/tools-header"

function App() {
  return (
    <div className="relative bg-gray-100">
      <SelectToolContextProvider>
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
