import { api } from './client'

export const generateJson = async (payload) => {
  const { data } = await api.post('/generate/', payload)
  return data
}

export const fetchGenerations = async () => {
  const { data } = await api.get('/generations/')
  return data
}
