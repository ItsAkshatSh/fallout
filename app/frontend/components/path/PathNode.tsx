import { useState, useEffect } from 'react'
// @ts-expect-error useModalStack lacks type declarations in this beta package
import { ModalLink, useModalStack } from '@inertiaui/modal-react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/shared/Tooltip'

const BILLBOARD_IMAGES = ['/path/1.png', '/path/2.png', '/path/3.png']

export default function PathNode({
  index,
  interactive = true,
  hasProjects = false,
  journalEntryCount = 0,
}: {
  index: number
  interactive?: boolean
  hasProjects?: boolean
  journalEntryCount?: number
}) {
  const activeIndex = hasProjects ? journalEntryCount + 1 : 0
  const state: 'completed' | 'active' | 'locked' =
    index < activeIndex ? 'completed' : index === activeIndex ? 'active' : 'locked'

  const { stack } = useModalStack()
  const modalOpen = stack.length > 0
  const [activeReady, setActiveReady] = useState(false)

  // Delay showing active tooltip so it appears after modal fade-out
  useEffect(() => {
    if (state !== 'active' || index === 0) return
    const timer = setTimeout(() => setActiveReady(true), 500)
    return () => clearTimeout(timer)
  }, [state, index])

  const starImage = (
    <img
      src="/path/star.png"
      fetchPriority="high"
      style={{ width: '100%', display: 'block', transform: 'translateY(20px)' }}
    />
  )

  const billboardImage = (
    <img
      src={BILLBOARD_IMAGES[index % BILLBOARD_IMAGES.length]}
      fetchPriority="high"
      style={{
        width: '100%',
        display: 'block',
      }}
    />
  )

  const content = (
    <div style={{ pointerEvents: 'auto' }} className="cursor-pointer">
      {index === 0 ? (
        state === 'active' && interactive ? (
          <ModalLink href="/projects/onboarding" className="outline-0">
            {starImage}
          </ModalLink>
        ) : (
          starImage
        )
      ) : state === 'active' && interactive ? (
        <ModalLink href="/journal_entries/new" className="outline-0">
          {billboardImage}
        </ModalLink>
      ) : (
        billboardImage
      )}
    </div>
  )

  if (!interactive) return content

  if (state === 'active') {
    const tooltipText = index === 0 ? 'Start here!' : journalEntryCount === 0 ? 'Here next!' : 'Continue here!'
    const showAlways = index === 0 ? !modalOpen : activeReady && !modalOpen
    return (
      <Tooltip side="top" gap={12} trackScroll alwaysShow={showAlways}>
        <TooltipTrigger>{content}</TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
    )
  }

  if (state === 'completed') {
    return (
      <Tooltip side="top" gap={12} trackScroll>
        <TooltipTrigger>{content}</TooltipTrigger>
        <TooltipContent>Completed</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip side="top" gap={12} trackScroll>
      <TooltipTrigger>{content}</TooltipTrigger>
      <TooltipContent>Locked</TooltipContent>
    </Tooltip>
  )
}
