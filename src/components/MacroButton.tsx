type MacroButtonProps = {
  label: string,
  icon?: string
}

function MacroButton({ label, icon }: MacroButtonProps) {
  return (
    <button
    className="
    w-32
    h-32
    rounded-2xl
    bg-zinc-800
    text-white
    text-lg
    font-semibold
    shadow-lg
    transition
    hover:bg-zinc-700
    active:scale-95">
      {icon && (
        <span className="text-4xl">{icon}</span>
        )}
      <div>{label}</div>
    </button>
  )
}

export default MacroButton