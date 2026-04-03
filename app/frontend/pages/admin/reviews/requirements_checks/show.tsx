import type { ReactNode } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Badge } from '@/components/admin/ui/badge'
import { Card, CardContent } from '@/components/admin/ui/card'
import { ChevronLeftIcon } from 'lucide-react'
import type { RequirementsCheckReviewDetail } from '@/types'

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  approved: 'default',
  returned: 'destructive',
  rejected: 'destructive',
  cancelled: 'outline',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm mt-0.5">{children}</dd>
    </div>
  )
}

export default function RequirementsChecksShow({
  review,
}: {
  review: RequirementsCheckReviewDetail
  can: { update: boolean }
}) {
  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeftIcon className="size-4" />
        Back
      </button>

      <h1 className="text-2xl font-semibold tracking-tight mb-1">Requirements Check #{review.id}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        for {review.project_name} by {review.user_display_name}
      </p>

      <Card>
        <CardContent>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Status">
              <Badge variant={statusColors[review.status] ?? 'outline'} className="capitalize">
                {review.status}
              </Badge>
            </Field>
            <Field label="Reviewer">{review.reviewer_display_name ?? '—'}</Field>
            <Field label="Created">{review.created_at}</Field>
          </dl>
        </CardContent>
      </Card>

      {(review.feedback || review.internal_reason) && (
        <Card className="mt-4">
          <CardContent className="space-y-4">
            {review.feedback && <Field label="Feedback">{review.feedback}</Field>}
            {review.internal_reason && <Field label="Internal Reason">{review.internal_reason}</Field>}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

RequirementsChecksShow.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
