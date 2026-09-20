import { type MacroButtonData } from "../types/MacroButtonData"
import MacroGrid from "../components/MacroGrid"

const numpadButtons: MacroButtonData[] = [
    {
        label: "SUPR",
        icon: "",
        action: {
            type: "key",
            keys: ["SUPR"],
        },
    },
    {
        label: "/",
        icon: "",
        action: {
            type: "key",
            keys: ["/"],
        },
    },
    {
        label: "*",
        icon: "",
        action: {
            type: "key",
            keys: ["*"],
        },
    },
    {
        label: "-",
        icon: "",
        action: {
            type: "key",
            keys: ["-"],
        },
    },
    {
        label: "7",
        icon: "",
        action: {
            type: "key",
            keys: ["7"],
        },
    },
    {
        label: "8",
        icon: "",
        action: {
            type: "key",
            keys: ["8"],
        },
    },
    {
        label: "9",
        icon: "",
        action: {
            type: "key",
            keys: ["9"],
        },
    },
    {
        label: "+",
        icon: "",
        size: "tall",
        action: {
            type: "key",
            keys: ["+"],
        },
    },
    {
        label: "4",
        icon: "",
        action: {
            type: "key",
            keys: ["4"],
        },
    },
    {
        label: "5",
        icon: "",
        action: {
            type: "key",
            keys: ["5"],
        },
    },
    {
        label: "6",
        icon: "",
        action: {
            type: "key",
            keys: ["6"],
        },
    },
    {
        label: "1",
        icon: "",
        action: {
            type: "key",
            keys: ["1"],
        },
    },
    {
        label: "2",
        icon: "",
        action: {
            type: "key",
            keys: ["2"],
        },
    },
    {
        label: "3",
        icon: "",
        action: {
            type: "key",
            keys: ["3"],
        },
    },
    {
        label: "Intro",
        icon: "",
        size: "tall",
        action: {
            type: "key",
            keys: ["ENTER"],
        },
    },
    {
        label: "0",
        icon: "",
        size: "wide",
        action: {
            type: "key",
            keys: ["0"],
        },
    },
    {
        label: ".",
        icon: "",
        action: {
            type: "key",
            keys: ["."],
        },
    },
]

function NumpadPage() {
    return (
        <div className="h-full flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">Numpad</h1>
            </div>

            <div className="flex-1">
                <MacroGrid buttonsData={numpadButtons} />
            </div>
        </div>
    )
}

export default NumpadPage