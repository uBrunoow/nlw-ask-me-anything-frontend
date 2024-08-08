import { useParams } from 'react-router-dom'
import AmaLogo from '../../assets/ama-logo.svg'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { Suspense } from 'react'
import CreateMessageFormComponent from '../../components/create-message-form'
import { Messages } from '../../components/all-messages'

function RoomPage() {
  const { id } = useParams()

  const handleShareRoom = () => {
    const url = window.location.href.toString()

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({
        title: 'Compartilhar sala',
        text: 'Compartilhe esta sala com outras pessoas',
        url
      })
    } else {
      navigator.clipboard.writeText(url)
    }

    toast.warning('O link da sala foi copiado')
  }

  return (
    <main className='mx-auto max-w-[640px] flex-col flex gap-6 py-10 px-4'>
      <header className='flex items-center justify-between px-3'>
        <div className='flex items-center gap-3'>
          <img src={AmaLogo} alt="ama logo" className='h-5'/>
          <span className='text-sm text-zinc-500 truncate'>
            Código da sala: <span className='text-zinc-300'>{id}</span>
          </span>
        </div>

        <button
          type='button'
          onClick={handleShareRoom}
          className='bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-zinc-700 transition-colors'
        >
          Compartilhar
          <Share2 className='size-4' />  
        </button>
      </header>

      <div className='h-px w-full  bg-zinc-900' />

      <CreateMessageFormComponent />

      <Suspense fallback={
        <p>
          Carregando...
        </p>
      }>
        <Messages />
      </Suspense>

    </main>
  )
}

export default RoomPage