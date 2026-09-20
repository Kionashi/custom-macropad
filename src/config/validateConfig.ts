import type { MacroPadConfig } from "../types/MacroPadConfig"

function validateConfig(config: unknown): MacroPadConfig {
    if (
        typeof config !== "object" ||
        config === null ||
        !("home" in config)
    ) {
        throw new Error("Configuration file malformed")
    }

    const home = config.home

    if (
        typeof home !== "object" ||
        home === null ||
        !("buttons" in home) ||
        !Array.isArray(home.buttons)
    ) {
        throw new Error("Configuration file malformed")
    }

    for (const button of home.buttons) {
        if (
            typeof button !== "object" ||
            button === null ||
            !("label" in button) ||
            typeof button.label !== "string" ||
            !("icon" in button) ||
            typeof button.icon !== "string"
        ) {
            throw new Error("Configuration file malformed")
        }

        if (
            "size" in button &&
            button.size !== "small" &&
            button.size !== "wide" &&
            button.size !== "large"
        ) {
            throw new Error("Configuration file malformed")
        }

        if (!("action" in button)) {
            continue
        }

        const action = button.action

        if (
            typeof action !== "object" ||
            action === null ||
            !("type" in action) ||
            (
                action.type !== "launch" &&
                action.type !== "key" &&
                action.type !== "media"
            )
        ) {
            throw new Error("Configuration file malformed")
        }

        if (action.type === "launch") {
            if (
                !("path" in action) ||
                typeof action.path !== "string"
            ) {
                throw new Error("Configuration file malformed")
            }
        }

        if (action.type === "key") {
            if (
                !("keys" in action) ||
                !Array.isArray(action.keys) ||
                !action.keys.every((key: unknown) => typeof key === "string")
            ) {
                throw new Error("Configuration file malformed")
            }
        }

        if (action.type === "media") {
            if (
                !("command" in action) ||
                action.command !== "play_pause" &&
                action.command !== "next" &&
                action.command !== "previous" &&
                action.command !== "volume_up" &&
                action.command !== "volume_down" &&
                action.command !== "stop"
            ) {
                throw new Error("Configuration file malformed")
            }
        }
    }

    return config as MacroPadConfig
}

export default validateConfig