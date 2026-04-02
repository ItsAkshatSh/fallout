import type { ReactNode } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/admin/ui/button'
import { Card, CardContent } from '@/components/admin/ui/card'
import { Input } from '@/components/admin/ui/input'
import { Textarea } from '@/components/admin/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/admin/ui/select'
import type { ShipForm, SharedProps } from '@/types'

export default function AdminShipsEdit({ ship, statuses }: { ship: ShipForm; statuses: string[] }) {
  const { errors } = usePage<SharedProps>().props

  const form = useForm({
    status: ship.status,
    feedback: ship.feedback,
    justification: ship.justification,
    approved_seconds: ship.approved_seconds,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    form.patch(`/admin/reviews/${ship.id}`)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Review Ship #{ship.id}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        for {ship.project_name} by {ship.user_display_name}
      </p>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={submit} className="space-y-4">
            {Object.keys(errors).length > 0 && (
              <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">
                <ul className="list-disc pl-4">
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

            <div className="space-y-1.5">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Select value={form.data.status} onValueChange={(val) => form.setData('status', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="feedback" className="text-sm font-medium">
                Feedback
              </label>
              <Textarea
                id="feedback"
                value={form.data.feedback}
                onChange={(e) => form.setData('feedback', e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="justification" className="text-sm font-medium">
                Justification
              </label>
              <Input
                id="justification"
                value={form.data.justification}
                onChange={(e) => form.setData('justification', e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="approved_seconds" className="text-sm font-medium">
                Approved seconds
              </label>
              <Input
                type="number"
                id="approved_seconds"
                value={form.data.approved_seconds ?? ''}
                onChange={(e) => form.setData('approved_seconds', e.target.value ? Number(e.target.value) : null)}
              />
            </div>

            <Button type="submit" disabled={form.processing}>
              {form.processing ? 'Updating...' : 'Update Ship'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

AdminShipsEdit.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
