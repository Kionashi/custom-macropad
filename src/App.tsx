import HomePage from "./pages/HomePage"
import MediaPage from "./pages/MediaPage"
import NumpadPage from "./pages/NumpadPage"
import { useState } from "react"
import PageNavigation from "./components/PageNavigation"
import { type Page } from "./types"
import SwipeContainer from "./components/SwipeContainer"

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

    function getNextPage(): Page {
        switch (currentPage) {
            case "home":
                return "media"
            case "media":
                return "numpad"
            case "numpad":
                return "home"
        }
    }

    function getPreviousPage(): Page {
        switch (currentPage) {
            case "home":
                return "numpad"
            case "media":
                return "home"
            case "numpad":
                return "media"
        }
    }

    return (
        <main>
            <SwipeContainer
                onSwipeLeft={() => setCurrentPage(getNextPage())}
                onSwipeRight={() => setCurrentPage(getPreviousPage())}
            >
                {renderPage()}
            </SwipeContainer>

            <PageNavigation
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </main>
    )
}

export default App