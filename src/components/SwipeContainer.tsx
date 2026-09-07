import { useRef, type ReactNode} from 'react'

type SwipeContainerProps = {
  onSwipeLeft: () => void
  onSwipeRight: () => void
  children: ReactNode
}

const SWIPE_THRESHOLD = 50

function evaluateSwipe(startX: number | null, endX: number): "left" | "right" | null {

    if (startX === null) return null

    const deltaX = endX - startX

    if (deltaX > SWIPE_THRESHOLD) {
        return "right"
    }
    
    if (deltaX < -SWIPE_THRESHOLD) {
        return "left"
    }

    return null

}

function SwipeContainer({ onSwipeLeft, onSwipeRight, children }: SwipeContainerProps) {
    const startX = useRef<number | null>(null)
    
    return (
        <div
            onPointerDown={(event) => {
                startX.current = event.clientX
            }}
            onPointerUp={(event) => {
                const direction = evaluateSwipe(startX.current, event.clientX)
                startX.current = null

                switch (direction) {
                    case "left":
                        onSwipeLeft()
                        break
                    case "right":
                        onSwipeRight()
                        break
                    default:
                        break
                }
            }}
        >
            {children}
        </div>
    )
}

export default SwipeContainer