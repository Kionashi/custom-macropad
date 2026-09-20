import { useEffect, useState } from "react"
import MacroGrid from "../components/MacroGrid"
import { loadConfig } from "../config/loadConfig"
import type { MacroPadConfig } from "../types/MacroPadConfig"

function HomePage() {
    const [config, setConfig] = useState<MacroPadConfig | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        loadConfig().then((config) => {
            setConfig(config)
        }).catch((error) => {
            setError(error)
        })
    }, [])

    if (error) {
        return <div>{error.message}</div>
    }

    if (config === null) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <h1>My Macro Pad</h1>
            <MacroGrid buttonsData={config.home.buttons} />
        </div>
    )
}

export default HomePage