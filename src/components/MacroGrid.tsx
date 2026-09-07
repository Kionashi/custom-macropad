import MacroButton, { type MacroButtonSize } from "./MacroButton"

type ButtonData = {
    label: string
    icon: string
    size?: MacroButtonSize
    onClick: () => void
}

const buttonData: ButtonData[] = [
    { label: "Godot", icon: "🎮", onClick: () => { console.log("Launching Godot") } },
    { label: "Steam", icon: "💻", size: "wide", onClick: () => { console.log("Launching Steam") } },
    { label: "Discord", icon: "💬", onClick: () => { console.log("Launching Discord") } },
    { label: "Spotify", icon: "🎵", onClick: () => { console.log("Launching Spotify") } },
    { label: "Games", icon: "🕹️", size: "large", onClick: () => { console.log("Launching Games") } },
    { label: "Numpad", icon: "🔢", onClick: () => { console.log("Launching Numpad") } },
]

function MacroGrid() {
    return (
        <div className="grid grid-cols-4 auto-rows-[8rem] gap-4">
            {buttonData.map((button) => (
                <MacroButton
                    key={button.label}
                    label={button.label}
                    icon={button.icon}
                    size={button.size}
                    onClick={button.onClick}
                />
            ))}
        </div>
    )
}

export default MacroGrid