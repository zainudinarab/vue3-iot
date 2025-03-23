import api from './axios'

export const getRuangans = async () => {
  const response = await api.get('/ruangans')
  return response.data
}
export const getRuanganById = async (id) => {
  const response = await api.get(`/ruangans/${id}`)
  return response.data
}

export const saveRuangan = async (data) => {
  if (data.id) {
    return await api.put(`/ruangans/${data.id}`, data)
  } else {
    return await api.post('/ruangans', data)
  }
}

export const deleteRuangan = async (id) => {
  return await api.delete(`/ruangans/${id}`)
}

export const getPerangkatsByRuangan = async (ruanganId) => {
  const response = await api.get(`/perangkat-grup-ruangan?ruangan_id=${ruanganId}`)
  return response.data
}

export const deletePerangkat = async (id) => {
  await axios.delete(`/perangkats/${id}`)
}
