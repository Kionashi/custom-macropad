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