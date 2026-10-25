import type { MacroPadConfig } from "../types/MacroPadConfig"
import { MACRO_BUTTON_ACTION_TYPES } from "../types/MacroButtonAction"

function validateConfig(config: unknown): MacroPadConfig {
    if (typeof config !== "object" || config === null) {
        throw new Error("Configuration must be an object")
    }

    if (!("home" in config)) {
        throw new Error("Configuration is missing the 'home' property")
    }

    const home = config.home

    if (typeof home !== "object" || home === null) {
        throw new Error("Configuration 'home' must be an object")
    }

    if (!("buttons" in home)) {
        throw new Error("Configuration 'home' is missing the 'buttons' property")
    }

    if (!Array.isArray(home.buttons)) {
        throw new Error("Configuration 'home.buttons' must be an array")
    }

    for (const [index, button] of home.buttons.entries()) {
        const buttonPath = `Button ${index}`

        if (typeof button !== "object" || button === null) {
            throw new Error(`${buttonPath} must be an object`)
        }

        if (!("label" in button)) {
            throw new Error(`${buttonPath} is missing the 'label' property`)
        }

        if (typeof button.label !== "string") {
            throw new Error(`${buttonPath} 'label' must be a string`)
        }

        if (!("icon" in button)) {
            throw new Error(`${buttonPath} is missing the 'icon' property`)
        }

        if (typeof button.icon !== "string") {
            throw new Error(`${buttonPath} 'icon' must be a string`)
        }

        if (
            "size" in button &&
            button.size !== "small" &&
            button.size !== "wide" &&
            button.size !== "large" &&
            button.size !== "tall"
        ) {
            throw new Error(
                `${buttonPath} has an invalid 'size'. Expected 'small', 'wide', 'tall', or 'large'`
            )
        }

        if (!("action" in button)) {
            continue
        }

        const action = button.action

        if (typeof action !== "object" || action === null) {
            throw new Error(`${buttonPath} 'action' must be an object`)
        }

        if (!("type" in action)) {
            throw new Error(`${buttonPath} 'action' is missing the 'type' property`)
        }

        if (
           !MACRO_BUTTON_ACTION_TYPES.includes(action.type)
        ) {
            throw new Error(
                `${buttonPath} has an invalid action type '${String(action.type)}'. ` +
                `Expected ${MACRO_BUTTON_ACTION_TYPES.join(", ")}`
            )
        }

        if (action.type === "launch") {
            if (!("path" in action)) {
                throw new Error(
                    `${buttonPath} launch action is missing the 'path' property`
                )
            }

            if (typeof action.path !== "string") {
                throw new Error(
                    `${buttonPath} launch action 'path' must be a string`
                )
            }
        }

        if (action.type === "key") {
            if (!("keys" in action)) {
                throw new Error(
                    `${buttonPath} key action is missing the 'keys' property`
                )
            }

            if (!Array.isArray(action.keys)) {
                throw new Error(
                    `${buttonPath} key action 'keys' must be an array`
                )
            }

            if (!action.keys.every((key: unknown) => typeof key === "string")) {
                throw new Error(
                    `${buttonPath} key action 'keys' must contain only strings`
                )
            }
        }

        if (action.type === "media") {
            if (!("command" in action)) {
                throw new Error(
                    `${buttonPath} media action is missing the 'command' property`
                )
            }

            if (
                action.command !== "play_pause" &&
                action.command !== "next" &&
                action.command !== "previous" &&
                action.command !== "volume_up" &&
                action.command !== "volume_down" &&
                action.command !== "stop"
            ) {
                throw new Error(
                    `${buttonPath} has an invalid media command '${String(action.command)}'`
                )
            }
        }
    }

    return config as MacroPadConfig
}

export default validateConfig