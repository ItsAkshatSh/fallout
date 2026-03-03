interface ProgressProps {
  current: number
  total: number
}

export default function Progress({ current, total }: ProgressProps) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="w-full max-w-lg">
      <div className="h-2 bg-light-brown/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-green rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-sm text-brown mt-2 text-center">
        {current + 1} of {total}
      </p>
    </div>
  )
}
