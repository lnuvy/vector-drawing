import { ShapesContextProvider } from "./contexts/shapes-context"
import KonvaStage from "./components/konva-stage"

export type Tool = "cursor" | "simple-line" | "spline" | "rect" | "circle" | "polygon"

function App() {
  return (
    <div className="relative bg-gray-100">
      <div className="h-[60px]">헤더영역</div>

      <div className="rounded-lg bg-white shadow-sm">
        <ShapesContextProvider>
          <KonvaStage />
        </ShapesContextProvider>
      </div>
    </div>
  )
}

export default App
