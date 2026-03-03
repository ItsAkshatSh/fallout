import type { StepProps } from '@/pages/onboarding/show'

export default function Dialogue({ step, onSubmit, processing }: StepProps) {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold text-dark-brown">{step.prompt}</h1>
      {step.subtitle && <p className="text-brown text-lg">{step.subtitle}</p>}
      <button
        onClick={() => onSubmit({ answer_text: '', is_other: false })}
        disabled={processing}
        className="w-full py-3.5 rounded-xl bg-green text-white font-semibold disabled:opacity-50 transition-colors hover:bg-green/90"
      >
        Get Started
      </button>
    </div>
  )
}
