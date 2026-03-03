import { useState } from 'react'
import OptionChip from './OptionChip'
import type { StepProps } from '@/pages/onboarding/show'

export default function SingleChoice({ step, existingAnswer, onSubmit, processing }: StepProps) {
  const [selected, setSelected] = useState(existingAnswer?.is_other ? '' : (existingAnswer?.answer_text ?? ''))
  const [isOther, setIsOther] = useState(existingAnswer?.is_other ?? false)
  const [otherText, setOtherText] = useState(existingAnswer?.is_other ? existingAnswer.answer_text : '')

  function handleSelect(option: string) {
    setSelected(option)
    setIsOther(false)
  }

  function handleOther() {
    setSelected('')
    setIsOther(true)
  }

  function handleContinue() {
    const answer = isOther ? otherText : selected
    if (!answer) return
    onSubmit({ answer_text: answer, is_other: isOther })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark-brown">{step.prompt}</h1>
      <p className="text-brown">{step.subtitle || 'Select only one'}</p>
      <div className="flex flex-col gap-3">
        {step.options?.map((opt) => (
          <OptionChip
            key={opt}
            label={opt}
            selected={selected === opt && !isOther}
            onClick={() => handleSelect(opt)}
          />
        ))}
        {step.allow_other && (
          <>
            <OptionChip label="Other" selected={isOther} onClick={handleOther} />
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
        disabled={processing || (!selected && !otherText)}
        className="w-full py-3.5 rounded-xl bg-green text-white font-semibold disabled:opacity-50 transition-colors hover:bg-green/90"
      >
        Continue
      </button>
    </div>
  )
}
