import { fetchWrapper } from '../../fetchWrapper'
import { Genre } from '@/models/genre'
import { GenreParams } from '@/models/genre/genreParams'
import { GENRE_QUERY_KEYS } from '@/api/genre/genreKeys'

const { GENRE, GET } = GENRE_QUERY_KEYS

export const fetchGenres = async (params: GenreParams = {}): Promise<Genre[]> => {
  const { data } = await fetchWrapper<Genre[]>({
    params,
    path: `${GENRE}/${GET}`,
    revalidateCacheInSeconds: 15 * 60, //15 minutes
  })
  return data ?? []
}
