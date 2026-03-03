import { useState } from 'react'
import OptionChip from './OptionChip'
import type { StepProps } from '@/pages/onboarding/show'

export default function MultiChoice({ step, existingAnswer, onSubmit, processing }: StepProps) {
  const initial: string[] = existingAnswer ? JSON.parse(existingAnswer.answer_text) : []
  const [selected, setSelected] = useState<string[]>(initial.filter((v) => step.options?.includes(v)))
  const [isOther, setIsOther] = useState(existingAnswer?.is_other ?? false)
  const [otherText, setOtherText] = useState(() => {
    if (!existingAnswer?.is_other) return ''
    const custom = initial.find((v) => !step.options?.includes(v))
    return custom ?? ''
  })

  function toggle(option: string) {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    )
  }

  function handleOtherToggle() {
    setIsOther(!isOther)
    if (isOther) setOtherText('')
  }

  function handleContinue() {
    const values = [...selected]
    if (isOther && otherText.trim()) values.push(otherText.trim())
    if (values.length === 0) return
    onSubmit({ answer_text: JSON.stringify(values), is_other: isOther })
  }

  const hasSelection = selected.length > 0 || (isOther && otherText.trim())

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark-brown">{step.prompt}</h1>
      <p className="text-brown">{step.subtitle || 'Select multiple'}</p>
      <div className="flex flex-col gap-3">
        {step.options?.map((opt) => (
          <OptionChip
            key={opt}
            label={opt}
            selected={selected.includes(opt)}
            onClick={() => toggle(opt)}
          />
        ))}
        {step.allow_other && (
          <>
            <OptionChip label="Other" selected={isOther} onClick={handleOtherToggle} />
            {isOther && (
              <input
                type="text"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Please specify..."
                className="border-2 border-light-brown/40 rounded-xl px-5 py-3.5 text-dark-brown focus:border-green focus:outline-none"
                autoFocus
              />
            )}
          </>
        )}
      </div>
      <button
        onClick={handleContinue}
        disabled={processing || !hasSelection}
        className="w-full py-3.5 rounded-xl bg-green text-white font-semibold disabled:opacity-50 transition-colors hover:bg-green/90"
      >
        Continue
      </button>
    </div>
  )
}
