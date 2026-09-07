type MacroButtonProps = {
  label: string
  icon?: string
  size?: MacroButtonSize
  onClick: () => void
}

export type MacroButtonSize = "small" | "wide" | "large"

const sizeClasses = {
  small: 'col-span-1 row-span-1',
  wide: 'col-span-2 row-span-1',
  large: 'col-span-2 row-span-2',
}

function MacroButton({
  label, 
  icon, 
  size = "small", 
  onClick
}: MacroButtonProps) {
  return (
    <button
    className={`
    w-full
    h-full
    ${sizeClasses[size]}
    rounded-2xl
    bg-zinc-800
    text-white
    text-lg
    font-semibold
    shadow-lg
    transition
    hover:bg-zinc-700
    active:scale-95
    `}
    onClick={onClick}
    >
      {icon && (
        <span className="text-4xl">{icon}</span>
        )}
      <div>{label}</div>
    </button>
  )
}

export default MacroButton