import { type MacroButtonSize, type MacroAction } from "../components/MacroButton"

export type ButtonData = {
    label: string
    icon: string
    size?: MacroButtonSize
    action?: MacroAction
}