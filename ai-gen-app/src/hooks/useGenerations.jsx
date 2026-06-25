import { useQuery } from '@tanstack/react-query'
import { fetchGenerations } from '../api/generator.api'

export const useGenerations = () => {
  return useQuery({
    queryKey: ['generations'],
    queryFn: fetchGenerations,
  })
}
