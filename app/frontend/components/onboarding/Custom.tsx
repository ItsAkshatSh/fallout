import type { ComponentType } from 'react'
import type { StepProps } from '@/pages/onboarding/show'

const CUSTOM_COMPONENTS: Record<string, ComponentType<StepProps>> = {
  // Register custom onboarding step components here:
  // ProfileSetup: ProfileSetup,
}

export default function Custom(props: StepProps) {
  const Component = CUSTOM_COMPONENTS[props.step.component ?? '']

  if (!Component) {
    return (
      <div className="space-y-6 text-center">
        <p className="text-brown">Unknown component: {props.step.component}</p>
        <button
          onClick={() => props.onSubmit({ answer_text: '', is_other: false })}
          className="w-full py-3.5 rounded-xl bg-green text-white font-semibold transition-colors hover:bg-green/90"
        >
          Skip
        </button>
      </div>
    )
  }

  return <Component {...props} />
}
