import MacroButton, { type MacroButtonSize, type MacroAction } from "./MacroButton"

type ButtonData = {
    label: string
    icon: string
    size?: MacroButtonSize
    action?: MacroAction
}

const buttonData: ButtonData[] = [
    {
        label: "Godot", icon: "🎮", action: {
            type: "launch",
            path: "C:\\Tools\\Godot\\Godot_v4.7.1.exe"
        }
    },
    {
        label: "Steam",
        icon: "💻",
        size: "wide",
        action: {
            type: "launch",
            path: "notepad.exe"
        }
    },
    { label: "Discord", icon: "💬" },
    { label: "Spotify", icon: "🎵" },
    { label: "Games", icon: "🕹️", size: "large" },
    { label: "Numpad", icon: "🔢", action: { type: "key", keys: ["1", "2", "3"] } }
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
                    action={button.action}
                />
            ))}
        </div>
    )
}

export default MacroGrid