import HomePage from "./pages/HomePage"
import MediaPage from "./pages/MediaPage"
import NumpadPage from "./pages/NumpadPage"
import { useState } from "react"
import PageNavigation from "./components/PageNavigation"
import { type Page } from "./types"

function App() {
    const [currentPage, setCurrentPage] = useState<Page>("home")

    function renderPage() {
        switch (currentPage) {
            case "home":
                return <HomePage />
            case "media":
                return <MediaPage />
            case "numpad":
                return <NumpadPage />
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