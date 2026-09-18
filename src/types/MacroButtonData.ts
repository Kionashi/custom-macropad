import { type MacroButtonSize } from "./MacroButtonSize"
import { type MacroButtonAction } from "./MacroButtonAction"

export type MacroButtonData = {
    label: string
    icon: string
    size?: MacroButtonSize
    action?: MacroButtonAction

}