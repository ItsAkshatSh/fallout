import { useForm, usePage } from '@inertiajs/react'
import { Modal, ModalLink } from '@inertiaui/modal-react'
import Frame from '@/components/shared/Frame'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import TextArea from '@/components/shared/TextArea'
import type { ProjectForm, SharedProps } from '@/types'

export default function ProjectsForm({
  project,
  title,
  submit_url,
  method,
  is_modal,
}: {
  project: ProjectForm
  title: string
  submit_url: string
  method: string
  is_modal: boolean
}) {
  const { errors } = usePage<SharedProps>().props

  const form = useForm({
    name: project.name,
    description: project.description,
    repo_link: project.repo_link,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (method === 'patch') {
      form.patch(submit_url)
    } else {
      form.post(submit_url)
    }
  }

  const content = (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="font-bold text-4xl text-dark-brown mb-6">{title}</h1>

      <form onSubmit={submit} className="space-y-4">
        {Object.keys(errors).length > 0 && (
          <div className="bg-coral/30 border-2 border-dark-brown text-dark-brown p-4 mb-4 rounded">
            <ul>
              {Object.entries(errors).map(([field, messages]) =>
                messages.map((msg) => (
                  <li key={`${field}-${msg}`}>
                    {field} {msg}
                  </li>
                )),
              )}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-bold text-dark-brown mb-1">
            Project name
          </label>
          <Input
            type="text"
            id="name"
            value={form.data.name}
            onChange={(e) => form.setData('name', e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-bold text-dark-brown mb-1">
            Description
          </label>
          <TextArea
            id="description"
            value={form.data.description}
            onChange={(e) => form.setData('description', e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="repo_link" className="block text-sm font-bold text-dark-brown mb-1">
            GitHub repo link
          </label>
          <Input
            type="url"
            id="repo_link"
            value={form.data.repo_link}
            onChange={(e) => form.setData('repo_link', e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>

        <div className="flex gap-4 pt-2">
          <Button type="submit" disabled={form.processing}>
            {form.processing ? 'Saving...' : 'Save'}
          </Button>
          {project.id && is_modal ? (
            <ModalLink
              href={`/projects/${project.id}`}
              replace
              className="bg-brown text-light-brown border-2 border-dark-brown px-4 py-2 font-bold uppercase hover:opacity-80"
            >
              Cancel
            </ModalLink>
          ) : (
            <Button variant="link" onClick={() => window.history.back()}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )

  if (is_modal) {
    return (
      <Modal panelClasses="h-full" paddingClasses="max-w-5xl mx-auto" closeButton={false}>
        <Frame className="h-full">{content}</Frame>
      </Modal>
    )
  }

  return content
}
