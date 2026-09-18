import MacroGrid from "../components/MacroGrid"

import type { MacroPadConfig } from "../types/MacroPadConfig"



const config: MacroPadConfig = {
    home: {
        buttons: [
            {
                label: "Godot",
                icon: "🎮",
                action: {
                    type: "launch",
                    path: "C:\\Tools\\Godot\\Godot_v4.7.1.exe"
                }
            },
            {
                label: "Steam",
                icon: "💻",
                size: "wide",
                action: { type: "key", keys: ["CTRL", "V"] }
            },
            {
                label: "Discord", icon: "💬",
                action: { type: "key", keys: ["a", "b", "c"] }
            },
            { label: "Spotify", icon: "🎵", action: { type: "key", keys: ["ALT", "TAB"] } },
            { label: "Games", icon: "🕹️", size: "large", action: { type: "key", keys: ["1", "2", "3"] } },
            { label: "Numpad", icon: "🔢", action: { type: "key", keys: ["CTRL", "C"] } }
        ]
    }
}

function HomePage() {
    return (
        <div>
            <h1>My Macro Pad</h1>
            <MacroGrid buttonsData={config.home.buttons} />
        </div>
    )
}

export default HomePage
