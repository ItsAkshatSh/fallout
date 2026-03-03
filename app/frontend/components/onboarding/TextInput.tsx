import { useState } from 'react'
import type { StepProps } from '@/pages/onboarding/show'

export default function TextInput({ step, existingAnswer, onSubmit, processing }: StepProps) {
  const [value, setValue] = useState(existingAnswer?.answer_text ?? '')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark-brown">{step.prompt}</h1>
      <input
        type={step.input_type || 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={step.placeholder}
        className="w-full border-2 border-light-brown/40 rounded-xl px-5 py-3.5 text-dark-brown focus:border-green focus:outline-none"
      />
      <button
        onClick={() => onSubmit({ answer_text: value, is_other: false })}
        disabled={processing || !value.trim()}
        className="w-full py-3.5 rounded-xl bg-green text-white font-semibold disabled:opacity-50 transition-colors hover:bg-green/90"
      >
        Continue
      </button>
    </div>
  )
}
