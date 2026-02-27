type Props = {
  koiBalance: number
  mail: boolean
  avatar: string
  displayName: string
}

export default function Header({ koiBalance, mail, avatar, displayName }: Props) {
  return (
    <header className="flex justify-between relative items-start">
      <div className="flex items-center">
        <img
          src={avatar}
          alt={displayName}
          className="rounded-full aspect-square size-16 bg-brown border-4 border-brown w-fit z-11"
        />
        <div className="h-16 bg-brown -ml-8 pl-10 pr-5 rounded-r-full text-light-brown text-xl flex items-center">
          <p className="-mt-0.5">{displayName}</p>
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
