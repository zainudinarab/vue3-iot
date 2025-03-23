import api from './axios'

export const getPerangkatsByRuangan = async (ruanganId) => {
  const response = await api.get(`perangkat-grup-ruangan?ruangan_id=${ruanganId}`)
  return response.data
}
export async function getRuangan() {
  try {
    const response = await api.get('/perangkat-by-ruangan')
    return response.data
  } catch (error) {
    console.error('Error fetching kelas list:', error)
    throw error
  }
}

export const createPerangkat = async (perangkat) => {
  return await api.post('/perangkats', perangkat)
}

export const deletePerangkat = async (id) => {
  return await api.delete(`/perangkats/${id}`)
}
export const updatePerangkatStatus = async (perangkatId, newStatus) => {
  try {
    // Melakukan PATCH request untuk memperbarui status perangkat
    const response = await api.patch(`/perangkat/${perangkatId}/status`, {
      status: newStatus,
    })
    return response.data // Mengembalikan data yang diterima dari API
  } catch (error) {
    console.error(`Error updating perangkat ${perangkatId} status:`, error)
    throw error // Melempar error jika terjadi masalah
  }
}
