import type { ReactNode } from 'react'
import { Link } from '@inertiajs/react'
import type { ColumnDef } from '@tanstack/react-table'
import AdminLayout from '@/layouts/AdminLayout'
import { Badge } from '@/components/admin/ui/badge'
import { Button } from '@/components/admin/ui/button'
import { Card, CardContent } from '@/components/admin/ui/card'
import { DataTable } from '@/components/admin/DataTable'
import { ChevronLeftIcon, ExternalLinkIcon } from 'lucide-react'
import type { AdminProjectDetail, PagyProps } from '@/types'

interface ShipRow {
  id: number
  status: string
  reviewer_display_name: string | null
  approved_seconds: number | null
  created_at: string
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  approved: 'default',
  rejected: 'destructive',
}

const shipColumns: ColumnDef<ShipRow>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <Link href={`/admin/reviews/${row.original.id}`} className="text-muted-foreground hover:underline">
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusColors[row.original.status] ?? 'outline'} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'reviewer_display_name',
    header: 'Reviewer',
    cell: ({ row }) => row.original.reviewer_display_name ?? <span className="text-muted-foreground">Unassigned</span>,
  },
  {
    accessorKey: 'approved_seconds',
    header: 'Approved Seconds',
    cell: ({ row }) => row.original.approved_seconds ?? <span className="text-muted-foreground">—</span>,
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
  },
]

function isSafeUrl(url: string | null): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function formatUrl(url: string): string {
  const match = url.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+)/)
  return match ? match[1] : url
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm mt-0.5">{children}</dd>
    </div>
  )
}

export default function AdminProjectsShow({
  project,
  ships,
  pagy_ships,
}: {
  project: AdminProjectDetail
  ships: ShipRow[]
  pagy_ships: PagyProps
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

      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.name}
            {project.is_unlisted && (
              <Badge variant="outline" className="ml-2 align-middle">
                Unlisted
              </Badge>
            )}
            {project.is_discarded && (
              <Badge variant="destructive" className="ml-2 align-middle">
                Deleted {project.discarded_at}
              </Badge>
            )}
          </h1>
          <div className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground mt-1">
            <span>by</span>
            <Link
              href={`/admin/users/${project.user_id}`}
              className="inline-flex items-center gap-1 text-foreground hover:underline"
            >
              <img src={project.user_avatar} alt={project.user_display_name} className="size-4 rounded-full" />
              {project.user_display_name}
            </Link>
            {project.collaborators.length > 0 && (
              <>
                <span>in collaboration with</span>
                {project.collaborators.map((collab, i) => (
                  <span key={collab.id} className="inline-flex items-center gap-1">
                    {i > 0 && (
                      <span className="text-muted-foreground">
                        {i === project.collaborators.length - 1 ? 'and' : ','}
                      </span>
                    )}
                    <Link
                      href={`/admin/users/${collab.id}`}
                      className="inline-flex items-center gap-1 text-foreground hover:underline"
                    >
                      <img src={collab.avatar} alt={collab.display_name} className="size-4 rounded-full" />
                      {collab.display_name}
                    </Link>
                  </span>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/projects/${project.id}`}>
              <ExternalLinkIcon data-icon="inline-start" />
              User Facing
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Entries">{project.journal_entries_count}</Field>
            <Field label="Repo Link">
              {isSafeUrl(project.repo_link) ? (
                <a
                  href={project.repo_link!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline truncate block"
                >
                  {formatUrl(project.repo_link!)}
                </a>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </Field>
            <Field label="Hrs Tracked">{project.hours_tracked}</Field>
            <Field label="Last Entry">
              {project.last_entry_at ?? <span className="text-muted-foreground">—</span>}
            </Field>
            <Field label="Demo Link">
              {isSafeUrl(project.demo_link) ? (
                <a
                  href={project.demo_link!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline truncate block"
                >
                  {formatUrl(project.demo_link!)}
                </a>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </Field>
            <Field label="Tags">{project.tags.length > 0 ? project.tags.join(', ') : '—'}</Field>
            <Field label="Created">{project.created_at}</Field>
          </dl>
          {project.description && (
            <div className="mt-4 pt-4 border-t border-border">
              <Field label="Description">{project.description}</Field>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Ships</h2>
        <Badge variant="secondary" className="text-sm">
          {pagy_ships.count}
        </Badge>
      </div>

      <DataTable columns={shipColumns} data={ships} pagy={pagy_ships} noun="ships" pageParam="ships_page" />
    </div>
  )
}

AdminProjectsShow.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
