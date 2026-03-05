import { Modal } from '@inertiaui/modal-react'
import Frame from '@/components/shared/Frame'

export default function ProjectsOnboarding({ is_modal }: { is_modal: boolean }) {
  const content = (
    <div className="w-full mx-auto p-8">
      <h1 className="font-bold text-4xl mb-4">Welcome to Fallout!</h1>
      <p className="text-lg">Get started by creating your first project.</p>
    </div>
  )

  if (is_modal) {
    return (
      <Modal panelClasses="h-full" paddingClasses="max-w-5xl mx-auto" closeButton={false} maxWidth="7xl">
        <Frame className="h-full">{content}</Frame>
      </Modal>
    )
  }

  return content
}
