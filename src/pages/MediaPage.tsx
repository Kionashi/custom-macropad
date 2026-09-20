import { type MacroButtonData } from "../types/MacroButtonData"
import MacroGrid from "../components/MacroGrid"

const mediaButtons: MacroButtonData[] = [
    {
        label: "Previous",
        icon: "⏮️",
        action: {
            type: "media",
            command: "previous",
        },
    },
    {
        label: "Play / Pause",
        icon: "▶️",
        size: "large",
        action: {
            type: "media",
            command: "play_pause",
        },
    },
    {
        label: "Next",
        icon: "⏭️",
        action: {
            type: "media",
            command: "next",
        },
    },
    {
        label: "Volume Down",
        icon: "🔉",
        size: "tall",
        action: {
            type: "media",
            command: "volume_down",
        },
    },
    {
        label: "Volume Up",
        icon: "🔊",
        size: "tall",
        action: {
            type: "media",
            command: "volume_up",
        },
    },
    {
        label: "Stop",
        icon: "⏹️",
        size: "wide",
        action: {
            type: "media",
            command: "stop",
        },
    },
]

function MediaPage() {
    return (
        <div className="h-full flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">Media</h1>
                <p className="text-gray-400 mt-1">
                    Control your music and media
                </p>
            </div>

            <div className="flex-1">
                <MacroGrid buttonsData={mediaButtons} />
            </div>
        </div>
    )
}

export default MediaPage