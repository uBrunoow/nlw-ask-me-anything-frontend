import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateRoomPage from './pages/create-room/create-room'
import RoomPage from './pages/room/room'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import AllRoomsPage from './pages/all-rooms/all-rooms'

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <CreateRoomPage/>
  },
  {
    path: '/room/:id',
    element: <RoomPage />
  },
  {
    path: '/all-rooms',
    element: <AllRoomsPage />
  }
])


export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={BrowserRouter} />
      <Toaster invert/>
    </QueryClientProvider>
  )
}

