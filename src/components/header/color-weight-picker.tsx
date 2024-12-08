import { Bold, Palette } from "lucide-react"
import { useSelectToolContext } from "@/contexts/select-tool-context"

const ColorWeightPicker = () => {
  const { color, setColor, weight, setWeight } = useSelectToolContext()

  return (
    <section className="flex gap-2">
      <div className="flex items-center gap-2">
        <Palette />
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      </div>
      <div className="mx-0 md:mx-2 xl:mx-4" />

      <div className="flex items-center gap-2">
        <Bold />
        <input type="range" min={5} max={50} value={weight} onChange={e => setWeight(Number(e.target.value))} />
        <p className="text-sm">{weight}px</p>
      </div>
    </section>
  )
}

export default ColorWeightPicker
