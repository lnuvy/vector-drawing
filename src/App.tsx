import { ShapesContextProvider } from "./contexts/shapes-context"
import KonvaStage from "./components/konva-stage"
import { SelectToolContextProvider } from "./contexts/select-tool-context"
import Header from "./components/header"

function App() {
  return (
    <div className="relative bg-gray-100">
      <SelectToolContextProvider>
        <ShapesContextProvider>
          <Header />
          <div className="rounded-lg bg-white shadow-sm">
            <KonvaStage />
          </div>
        </ShapesContextProvider>
      </SelectToolContextProvider>
    </div>
  )
}

export default App
