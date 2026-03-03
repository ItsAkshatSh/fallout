interface OptionChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

export default function OptionChip({ label, selected, onClick }: OptionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-3.5 rounded-xl border-2 text-left transition-all font-medium ${
        selected
          ? 'border-green bg-light-green text-dark-brown'
          : 'border-light-brown/40 bg-white text-dark-brown hover:border-brown/60'
      }`}
    >
      {label}
    </button>
  )
}
