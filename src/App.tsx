import Header from "@/components/header"
import KonvaStage from "@/components/konva-stage"
import { SelectToolContextProvider } from "@/contexts/select-tool-context"
import { ShapesHistoryContextProvider } from "@/contexts/shapes-history-context"

function App() {
  return (
    <div className="relative bg-gray-100">
      <SelectToolContextProvider>
        <ShapesHistoryContextProvider>
          <Header />
          <div className="rounded-lg bg-white shadow-sm">
            <KonvaStage />
          </div>
        </ShapesHistoryContextProvider>
      </SelectToolContextProvider>
    </div>
  )
}

export default App
