import { useState, useEffect } from 'react'
import { ModalLink } from '@inertiaui/modal-react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/shared/Tooltip'

const BILLBOARD_IMAGES = ['/path/1.png', '/path/2.png', '/path/3.png']

export default function PathNode({ index, interactive = true, hasProjects = false }: { index: number; interactive?: boolean; hasProjects?: boolean }) {
  const showStarTooltip = index === 0 && !hasProjects
  const showDoneTooltip = index === 0 && hasProjects
  const showNode1Tooltip = index === 1 && hasProjects
  const [modalOpen, setModalOpen] = useState(false)
  const [node1Ready, setNode1Ready] = useState(false)

  // Delay showing node 1 tooltip so it appears after modal fade-out
  useEffect(() => {
    if (!showNode1Tooltip) return
    const timer = setTimeout(() => setNode1Ready(true), 500)
    return () => clearTimeout(timer)
  }, [showNode1Tooltip])

  const starImage = (
    <img
      src="/path/star.png"
      fetchPriority="high"
      style={{ width: '100%', display: 'block', transform: `translateY(20px)` }}
    />
  )

  const content = (
    <div style={{ pointerEvents: 'auto' }} className="cursor-pointer">
      {index === 0 && interactive && !hasProjects && (
        <ModalLink
          href="/projects/onboarding"
          className="outline-0"
          onStart={() => setModalOpen(true)}
          onAfterLeave={() => setModalOpen(false)}
        >
          {starImage}
        </ModalLink>
      )}
      {index === 0 && (!interactive || hasProjects) && starImage}
      {index === 3 && <img src="/path/slack.png" fetchPriority="high" style={{ width: '100%', display: 'block' }} />}

      {index !== 0 && index !== 3 && (
        <img
          src={BILLBOARD_IMAGES[index % BILLBOARD_IMAGES.length]}
          fetchPriority="high"
          style={{ width: '100%', display: 'block' }}
        />
      )}
    </div>
  )

  if (!interactive) return content

  if (showStarTooltip) {
    return (
      <Tooltip side="top" gap={12} trackScroll alwaysShow={!modalOpen}>
        <TooltipTrigger>{content}</TooltipTrigger>
        <TooltipContent>Start here!</TooltipContent>
      </Tooltip>
    )
  }

  if (showDoneTooltip) {
    return (
      <Tooltip side="top" gap={12} trackScroll>
        <TooltipTrigger>{content}</TooltipTrigger>
        <TooltipContent>Already done!</TooltipContent>
      </Tooltip>
    )
  }

  if (showNode1Tooltip) {
    return (
      <Tooltip side="top" gap={12} trackScroll alwaysShow={node1Ready}>
        <TooltipTrigger>{content}</TooltipTrigger>
        <TooltipContent>Click here!</TooltipContent>
      </Tooltip>
    )
  }

  return content
}
