import { useNavigate, useSearchParams } from 'react-router-dom'
import AmaLogo from '../../assets/ama-logo.svg'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { GetRooms } from '../../http/get-rooms'
import { useState, useEffect } from 'react'

function AllRoomsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = parseInt(searchParams.get('page') || '1', 10)
  const [page, setPage] = useState(initialPage)
  const navigate = useNavigate()

  useEffect(() => {
    setSearchParams({ page: page.toString() })
  }, [page, setSearchParams])

  const { data } = useSuspenseQuery({
    queryKey: ['rooms', page],
    queryFn: () => GetRooms(page),
  })

  const handleIncreasePage = () => {
    if (data && data.rooms && data.rooms.length > 4) {
      setPage(page + 1)
    }
  }

  const handleDecreasePage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <main className='h-screen flex items-center justify-center px-4'>
      <div className='max-w-[450px] flex flex-col gap-6'>
        <img src={AmaLogo} alt="ama logo" className='h-10'/>

        <p className='leading-relaxed text-zinc-300 text-center'>
          Entre em uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
        </p>

        <div className='max-h-[700px] overflow-auto flex flex-col gap-6'>
          {data.rooms && data.rooms.length > 0 ? data.rooms.map((room, index) => (
            <div key={index} className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:border-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'>

              <div className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-300'>
                Nome da sala: <span className='text-zinc-100 truncate'>{room.theme}</span>
              </div>

              <button
                onClick={() => navigate(`/room/${room.id}`)}
                className='bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors'
              >
                Entrar na sala
                <ArrowRight className='size-4' />  
              </button>

            </div>
          )) : (
            <p className='flex items-center gap-2 justify-center text-orange-400'>
              <AlertTriangle className='size-4'/>
              Nenhuma sala encontrada!
            </p>
          )}
        </div>

        <div className='h-px w-full  bg-zinc-900' />

        <div className='flex flex-row gap-5 items-center justify-center'>
          <button onClick={handleDecreasePage} className='hover:text-orange-500 hover:underline'>Anterior</button>
          <div className='px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800'>{page}</div>
          <button onClick={handleIncreasePage} className='hover:text-orange-500 hover:underline'>Próximo</button>
        </div>

      </div>
    </main>
  )
}

export default AllRoomsPage