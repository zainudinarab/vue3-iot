import api from './axios'

export const getGedungs = async () => {
  const response = await api.get('/gedungs')
  return response.data
}

export const getGedung = async (id) => {
  const response = await api.get(`/gedungs/${id}`)
  return response.data
}

export const saveGedung = async (gedung) => {
  if (gedung.id) return await api.put(`/gedungs/${gedung.id}`, gedung)
  return await api.post('/gedungs', gedung)
}

export const deleteGedung = async (id) => {
  return await api.delete(`/gedungs/${id}`)
}
export const getLantaisByGedung = async (gedungId) => {
  const response = await api.get(`/lantais?gedung_id=${gedungId}`)
  return response.data
}
