export const GetRooms = async (page: number) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms?page=${page}&pageSize=5`);

  const data: Array<{
    ID: string
    Theme: string
  }> = await response.json()

  return {
    rooms: data.map(item => {
      return {
        id: item.ID,
        theme: item.Theme,
      }
    })
  }
}