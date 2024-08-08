import { ArrowRight } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { CreateMessage } from '../http/create-message'
import { toast } from 'sonner'

function CreateMessageFormComponent() {
  const { id } = useParams()

  if (!id) {
    throw new Error('Componente de formulário de mensagem deve ter um id de sala')
  }

  const handleCreateMessage = async (data: FormData) => {
      const message = data.get('message')?.toString()

      if (!message) {
        toast.error('Pergunta é obrigatória')
        return
      }

      try { 
        await CreateMessage({ id, message })

        toast.success('Pergunta criada com sucesso!')
      } catch (error) {
        console.error(error)
        toast.error('Erro ao criar pergunta')
        throw error
    }
  }

  return (
    <form 
      action={handleCreateMessage}
      className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:border-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'
    >
      <input 
        type="text"
        placeholder='Qual a sua pergunta'
        autoComplete='off'
        name='message'
        className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100'
      />
      <button
        type='submit'
        className='bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors'
      >
        Criar pergunta
        <ArrowRight className='size-4' />  
      </button>
    </form>
  )
}

export default CreateMessageFormComponent