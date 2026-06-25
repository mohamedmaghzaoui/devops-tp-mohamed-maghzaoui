import { useMutation, useQueryClient } from '@tanstack/react-query'
import { generateJson } from '../api/generator.api'

export const useGenerateJson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: generateJson,

    onMutate: () => {
      queryClient.setQueryData(['loading'], true)
    },

    onSuccess: (data) => {
      queryClient.setQueryData(['generated-json'], data)
      queryClient.setQueryData(['loading'], false)
    },

    onError: () => {
      queryClient.setQueryData(['loading'], false)
    },
  })
}
