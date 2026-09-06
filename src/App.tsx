import MacroButton from "./components/MacroButton"

function App() {
  return (
    <main>
      <h1>My Macro Pad</h1>

      <div className="grid grid-cols-4 auto-rows-[8rem] gap-4">
        <MacroButton label="Godot" icon="🎮" />
        <MacroButton label="Steam" icon="💻" size="wide" />
        <MacroButton label="Discord" icon="💬" />
        <MacroButton label="Spotify" icon="🎵" />
        <MacroButton label="Games" icon="🕹️" size="large" />
        <MacroButton label="Numpad" icon="🔢" />
        <MacroButton label="Utilities" icon="⚙️" />
        <MacroButton label="Settings" icon="🔧" />
      </div>
    </main>
  )
}

export default App