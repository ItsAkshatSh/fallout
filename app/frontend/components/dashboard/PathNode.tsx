const BILLBOARD_IMAGES = ['/path/1.png', '/path/2.png', '/path/3.png']

export default function PathNode({ index }: { index: number }) {
  return (
    <>
      {index === 0 && (
        <img
          src="/path/star.png"
          fetchPriority="high"
          style={{ width: '100%', display: 'block', transform: `translateY(20px)` }}
        />
      )}
      {index === 3 && <img src="/path/slack.png" fetchPriority="high" style={{ width: '100%', display: 'block' }} />}

      {/* fallback billboard images */}
      {index !== 0 && index !== 3 && (
        <img
          src={BILLBOARD_IMAGES[index % BILLBOARD_IMAGES.length]}
          fetchPriority="high"
          style={{ width: '100%', display: 'block' }}
        />
      )}
    </>
  )
}
