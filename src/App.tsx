import MacroGrid from "./components/MacroGrid"
import { useState } from "react"
import PageNavigation, { type Page } from "./components/PageNavigation"


function App() {
    const [currentPage, setCurrentPage] = useState<Page>("home")

    function renderPage() {
        switch (currentPage) {
            case "home":
                return <MacroGrid />
            case "media":
                return <div>Media Page</div>
            case "numpad":
                return <div>Numpad Page</div>
        }
    }

    return (
        <main>
            <h1>My Macro Pad</h1>
            {renderPage()}

            <PageNavigation
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </main>
    )
}

export default App