import type { ReactNode } from 'react'
import { Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/AdminLayout'
import { Badge } from '@/components/admin/ui/badge'
import { Button } from '@/components/admin/ui/button'
import { Card, CardContent } from '@/components/admin/ui/card'
import type { AdminShipDetail } from '@/types'

function isSafeUrl(url: string | null): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm mt-0.5">{children}</dd>
    </div>
  )
}

export default function AdminShipsShow({ ship, can }: { ship: AdminShipDetail; can: { update: boolean } }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ship #{ship.id}</h1>
          <p className="text-sm text-muted-foreground">
            for {ship.project_name} by {ship.user_display_name}
          </p>
        </div>
        {can.update && (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/reviews/${ship.id}/edit`}>Edit</Link>
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Status">
              <Badge className="capitalize">{ship.status}</Badge>
            </Field>
            <Field label="Reviewer">{ship.reviewer_display_name ?? '—'}</Field>
            <Field label="Approved Seconds">{ship.approved_seconds ?? '—'}</Field>
            <Field label="Created">{ship.created_at}</Field>
          </dl>
        </CardContent>
      </Card>

      {(ship.justification || ship.feedback) && (
        <Card className="mt-4">
          <CardContent className="pt-6 space-y-4">
            {ship.justification && <Field label="Justification">{ship.justification}</Field>}
            {ship.feedback && <Field label="Feedback">{ship.feedback}</Field>}
          </CardContent>
        </Card>
      )}

      <Card className="mt-4">
        <CardContent className="pt-6">
          <dl className="grid grid-cols-2 gap-4">
            <Field label="Frozen Demo Link">
              {isSafeUrl(ship.frozen_demo_link) ? (
                <a
                  href={ship.frozen_demo_link!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline truncate block"
                >
                  {ship.frozen_demo_link!.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+)/)?.[1] ??
                    ship.frozen_demo_link}
                </a>
              ) : (
                '—'
              )}
            </Field>
            <Field label="Frozen Repo Link">
              {isSafeUrl(ship.frozen_repo_link) ? (
                <a
                  href={ship.frozen_repo_link!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline truncate block"
                >
                  {ship.frozen_repo_link!.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+)/)?.[1] ??
                    ship.frozen_repo_link}
                </a>
              ) : (
                '—'
              )}
            </Field>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

AdminShipsShow.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
