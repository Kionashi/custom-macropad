import MacroButton from "./MacroButton"
import { type MacroButtonData } from "../types/MacroButtonData"

export type MacroGridProps = {
    buttonsData: MacroButtonData[]
}

function MacroGrid({ buttonsData }: MacroGridProps) {
    return (
        <div className="grid grid-cols-4 auto-rows-[8rem] gap-4">
            {buttonsData.map((button) => (
                <MacroButton
                    key={button.label}
                    label={button.label}
                    icon={button.icon}
                    size={button.size}
                    action={button.action}
                />
            ))}
        </div>
    )
}

export default MacroGrid