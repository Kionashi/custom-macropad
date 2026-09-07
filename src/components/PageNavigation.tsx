type PageNavigationProps = {
  currentPage: Page
  onPageChange: (page: Page) => void
}

export type Page = "home" | "media" | "numpad"

function PageNavigation({ currentPage, onPageChange }: PageNavigationProps) {

    return (
        <div>
            <button className={currentPage === "home" ? "bg-zinc-700" : "bg-zinc-900"} onClick={() => onPageChange("home")}>
            Home
            </button>
            <button className={currentPage === "media" ? "bg-zinc-700" : "bg-zinc-900"} onClick={() => onPageChange("media")}>
            Media
            </button>
            <button className={currentPage === "numpad" ? "bg-zinc-700" : "bg-zinc-900"} onClick={() => onPageChange("numpad")}>
            Numpad
            </button>
        </div>
    )
}

export default PageNavigation