import { invoke } from "@tauri-apps/api/core"

type MacroButtonProps = {
    label: string
    icon?: string
    size?: MacroButtonSize
    action?: MacroAction
}

export type MacroAction =
    | {
        type: "launch"
        path: string
    }
    | {
        type: "media"
        command: "play_pause" | "next" | "previous" | "volume_up" | "volume_down"
    }
    | {
        type: "key"
        keys: string[]
    }
    | {
        type: "invoke"
        function: string
    }
    | {
        type: "test"
    }

export type MacroButtonSize = "small" | "wide" | "large"

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

function getActionHandler(action: MacroAction) {
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
        case "invoke":
            return async () => {
                try {
                    console.log(await invoke(action.function))
                } catch (error) {
                    alert("Failed to invoke function:" + error)
                }
            }
        case "test":
            return async () => {
                try {
                    console.log("CLICK")
                } catch (error) {
                    alert("Failed to execute test action:" + error)
                }
            }
    }
}
export default MacroButton