import MacroButton from "../components/MacroButton"
import { type MacroButtonData } from "../types/MacroButtonData"

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
        action: {
            type: "media",
            command: "volume_down",
        },
    },
    {
        label: "Volume Up",
        icon: "🔊",
        action: {
            type: "media",
            command: "volume_up",
        },
    },
    {
        label: "Stop",
        icon: "⏹️",
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

            <div className="flex-1 grid grid-cols-4 auto-rows-[8rem] gap-4">
                {mediaButtons.map((button) => (
                    <MacroButton
                        key={button.label}
                        label={button.label}
                        icon={button.icon}
                        size={button.size}
                        action={button.action}
                    />
                ))}
            </div>
        </div>
    )
}

export default MediaPage