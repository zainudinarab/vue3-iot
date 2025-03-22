import apiClient from './axios' // Impor instance Axios

export default {
  // Gedung
  async getGedungs() {
    try {
      const response = await apiClient.get('/gedungs')
      return response.data // Pastikan mengembalikan data yang diinginkan
    } catch (error) {
      console.error('Error fetching gedungs:', error)
      throw error // Melakukan throw untuk error handling lebih lanjut
    }
  },

  async getGedung(id) {
    try {
      const response = await apiClient.get(`/gedungs/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching gedung with ID ${id}:`, error)
      throw error
    }
  },

  async createGedung(data) {
    try {
      const response = await apiClient.post('/gedungs', data)
      return response.data
    } catch (error) {
      console.error('Error creating gedung:', error)
      throw error
    }
  },

  async updateGedung(id, data) {
    try {
      const response = await apiClient.put(`/gedungs/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating gedung with ID ${id}:`, error)
      throw error
    }
  },

  async deleteGedung(id) {
    try {
      const response = await apiClient.delete(`/gedungs/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting gedung with ID ${id}:`, error)
      throw error
    }
  },

  // Ambil data kelas dan perangkat
  async getRuangan() {
    try {
      const response = await apiClient.get('/ruangans')
      return response.data
    } catch (error) {
      console.error('Error fetching kelas list:', error)
      throw error
    }
  },

  // Update status perangkat
  async updatePerangkatStatus(perangkatId, newStatus) {
    try {
      const response = await apiClient.patch(`/perangkat/${perangkatId}/status`, {
        status: newStatus,
      })
      return response.data
    } catch (error) {
      console.error(`Error updating perangkat ${perangkatId} status:`, error)
      throw error
    }
  },
}
