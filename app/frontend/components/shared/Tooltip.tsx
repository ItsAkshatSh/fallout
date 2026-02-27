import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'
import React from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Side = 'right' | 'left'
type Pos = { top: number; left: number; side: Side }

type CtxValue = {
  open: boolean
  setOpen: (v: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
}

const Ctx = createContext<CtxValue | null>(null)

function useCtx() {
  const v = useContext(Ctx)
  if (!v) throw new Error('Tooltip components must be used inside <Tooltip>')
  return v
}

const GAP = 10

export function Tooltip({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLElement>(null)
  return <Ctx.Provider value={{ open, setOpen, triggerRef }}>{children}</Ctx.Provider>
}

export function TooltipTrigger({ children, asChild }: { children: ReactNode; asChild?: boolean }) {
  const { setOpen, triggerRef } = useCtx()

  const handlers = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ...handlers,
      ref: triggerRef,
    })
  }

  return (
    <span ref={triggerRef as React.RefObject<HTMLSpanElement>} {...handlers}>
      {children}
    </span>
  )
}

export function TooltipContent({ children, className }: { children: ReactNode; className?: string }) {
  const { open, triggerRef } = useCtx()
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<Pos | null>(null)

  useLayoutEffect(() => {
    if (!open) {
      setPos(null)
      return
    }
    if (!ref.current || !triggerRef.current) return

    const tr = triggerRef.current.getBoundingClientRect()
    const tt = ref.current.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    const side: Side = vw - tr.right >= tt.width + GAP ? 'right' : 'left'
    const top = Math.max(8, Math.min(vh - tt.height - 8, tr.top + tr.height / 2 - tt.height / 2))
    const left = side === 'right' ? tr.right + GAP : tr.left - tt.width - GAP

    setPos({ top, left, side })
  }, [open, triggerRef])

  if (!open) return null

  return createPortal(
    <div
      ref={ref}
      role="tooltip"
      className={twMerge(
        'fixed z-50 pointer-events-none px-3 py-2 text-sm rounded',
        'bg-light-brown border-2 border-dark-brown text-dark-brown shadow-md',
        className,
      )}
      style={pos ? { top: pos.top, left: pos.left } : { visibility: 'hidden', top: 0, left: 0 }}
    >
      {pos && (
        <>
          <span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2 w-0 h-0"
            style={
              pos.side === 'right'
                ? {
                    right: '100%',
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '8px solid #61453a',
                  }
                : {
                    left: '100%',
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderLeft: '8px solid #61453a',
                  }
            }
          />
          <span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2 w-0 h-0"
            style={
              pos.side === 'right'
                ? {
                    right: 'calc(100% - 2px)',
                    borderTop: '7px solid transparent',
                    borderBottom: '7px solid transparent',
                    borderRight: '7px solid #edd1b0',
                  }
                : {
                    left: 'calc(100% - 2px)',
                    borderTop: '7px solid transparent',
                    borderBottom: '7px solid transparent',
                    borderLeft: '7px solid #edd1b0',
                  }
            }
          />
        </>
      )}
      {children}
    </div>,
    document.body,
  )
}
