import { useQuery } from '@tanstack/react-query'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { getActiveWheel } from '@/app/lib/api/wheel/queries'
import { wheelKeys } from '../keys'

export const useFetchActiveWheel = () => {
  return useQuery({
    queryFn: () => getActiveWheel(),
    queryKey: wheelKeys.getActiveWheel,
    throwOnError: onQueryError,
  })
}
