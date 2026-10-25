export type MacroButtonAction =
    | {
        type: "launch"
        path: string
    }
    | {
        type: "media"
        command: "play_pause" | "next" | "previous" | "volume_up" | "volume_down" | "stop"
    }
    | {
        type: "key"
        keys: string[]
    }
    | {
        type: "open"
        target: string
    }

export const MACRO_BUTTON_ACTION_TYPES = [
    "launch",
    "media",
    "key",
    "open",
] as const satisfies readonly MacroButtonAction["type"][]