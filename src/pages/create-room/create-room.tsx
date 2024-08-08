import { useNavigate } from 'react-router-dom'
import AmaLogo from '../../assets/ama-logo.svg'
import { ArrowRight } from 'lucide-react'
import { CreateRoom } from '../../http/create-room'
import { toast } from 'sonner'

function CreateRoomPage() {
  const navigate = useNavigate()

  const handleCreateRoom = async (data: FormData) => {
    const theme = data.get('theme')?.toString()

    if (!theme) {
      toast.error('Nome da sala é obrigatório')
      return
    }

    try { 
      const { roomId } = await CreateRoom({ theme })
  
      navigate(`/room/${roomId}`)
      toast.success('Sala criada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar sala')
      throw error
    }
  }

  return (
    <main className='h-screen flex items-center justify-center px-4'>
      <div className='max-w-[450px] flex flex-col gap-6'>
        <img src={AmaLogo} alt="ama logo" className='h-10'/>

        <p className='leading-relaxed text-zinc-300 text-center'>
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
        </p>

        <form 
          action={handleCreateRoom}
          className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:border-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'
        >
          <input 
            type="text"
            placeholder='Nome da sala'
            autoComplete='off'
            name='theme'
            className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100'
          />
          <button
            type='submit'
            className='bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors'
          >
            Criar sala
            <ArrowRight className='size-4' />  
          </button>
        </form>

        <a href="/all-rooms" className='text-center text-orange-400 hover:text-orange-500 hover:underline'>
          Ver todas as salas
        </a>
      </div>
    </main>
  )
}

export default CreateRoomPage