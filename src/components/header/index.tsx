import ColorWeightPicker from "./color-weight-picker"
import ToolsHeader from "./tools-header"

const Header = () => {
  return (
    <header className="h-16">
      <div className="flex h-full items-center gap-10">
        {/* <h1 className="hidden px-5 text-2xl font-bold xl:block">Draw tool 구현 - 이한울</h1> */}
        <ColorWeightPicker />
      </div>
      <ToolsHeader />
    </header>
  )
}

export default Header
