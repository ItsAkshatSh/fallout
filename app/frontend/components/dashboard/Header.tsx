import { useState, useRef, useEffect } from 'react'
import { usePage, router } from '@inertiajs/react'
import type { SharedProps } from '@/types'

type Props = {
  koiBalance: number
  mail: boolean
  avatar: string
  displayName: string
}

export default function Header({ koiBalance, mail, avatar, displayName }: Props) {
  const shared = usePage<SharedProps>().props
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function signOut(e: React.MouseEvent) {
    e.preventDefault()
    router.delete(shared.sign_out_path)
  }

  return (
    <header className="flex justify-between relative items-start">
      <div ref={containerRef} className="flex items-center">
        <img
          src={avatar}
          alt={displayName}
          className="rounded-full aspect-square size-16 bg-brown border-4 border-brown w-fit z-11"
        />
        <div className="flex flex-col -ml-8">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="menu"
            onClick={() => setIsOpen(!isOpen)}
            className={`h-16 bg-brown pl-10 pr-5 min-w-40 text-light-brown text-xl flex items-center transition-all duration-200 ${
              isOpen ? 'rounded-tr-2xl' : 'rounded-r-full'
            }`}
          >
            <span className="-mt-0.5">{displayName}</span>
          </button>
          <div
            aria-hidden={!isOpen}
            className={`bg-brown overflow-hidden transition-all duration-200 rounded-bl-[2rem] rounded-br-2xl ${
              isOpen ? 'max-h-24' : 'max-h-0'
            }`}
          >
            <button
              type="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={signOut}
              className="w-full pl-10 pr-5 py-3 text-left text-light-brown text-lg hover:brightness-110 transition-all"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-8 items-center">
        <div className="flex items-center space-x-2">
          <img src="/koifish.png" alt="koi" className="h-10" />
          <span className="text-coral text-4xl xl:text-5xl font-bold">{koiBalance}</span>
        </div>
        <div className="relative">
          <img src="/envelope.png" alt="mail" className="h-10" />
          {mail && (
            <>
              <span className="absolute top-1 right-0 rounded-full size-3 bg-coral" />
              <span className="absolute top-1 right-0 rounded-full size-3 bg-coral animate-ping" />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
