import { invoke } from "@tauri-apps/api/core"
import { type MacroButtonSize } from "../types/MacroButtonSize"
import { type MacroButtonAction } from "../types/MacroButtonAction"

type MacroButtonProps = {
    label: string
    icon?: string
    size?: MacroButtonSize
    action?: MacroButtonAction
}

const sizeClasses = {
    small: 'col-span-1 row-span-1',
    wide: 'col-span-2 row-span-1',
    large: 'col-span-2 row-span-2',
}

function MacroButton({
    label,
    icon,
    size = "small",
    action
}: MacroButtonProps) {
    return (
        <button
            className={`
    w-full
    h-full
    ${sizeClasses[size]}
    rounded-2xl
    bg-zinc-800
    text-white
    text-lg
    font-semibold
    shadow-lg
    transition
    hover:bg-zinc-700
    active:scale-95
    `}
            onClick={action ? getActionHandler(action) : undefined}
        >
            {icon && (
                <span className="text-4xl">{icon}</span>
            )}
            <div>{label}</div>
        </button>
    )
}

function getActionHandler(action: MacroButtonAction) {
    switch (action.type) {
        case "launch":
            return async () => {
                try {
                    await invoke("launch_app", { path: action.path })
                } catch (error) {
                    alert("Failed to launch app:" + error)
                }
            }
        case "key":
            return async () => {
                try {
                    await invoke("press_key", { keys: action.keys })
                } catch (error) {
                    alert("Failed to press key:" + error)
                }
            }
        case "media":
            return async () => {
                try {
                    await invoke("press_key", { keys: [action.command] })
                } catch (error) {
                    alert("Failed to send media command:" + error)
                }
            }
    }
}
export default MacroButton