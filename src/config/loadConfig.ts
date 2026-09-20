import type { MacroPadConfig } from "../types/MacroPadConfig";
import validateConfig from "./validateConfig";

export async function loadConfig(): Promise<MacroPadConfig> {
    const response = await fetch("/config/default.json")

    if (!response.ok) {
        throw new Error("Failed to load configuration")
    }

    const config = await response.json()

    return validateConfig(config)
}
