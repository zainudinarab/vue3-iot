import apiClient from './axios'; // Impor instance Axios

export default {
    // Ambil data kelas dan perangkat
    async getKelasList() {
        try {
            const response = await apiClient.get('/kelas'); // Sesuaikan endpoint
            return response.data;
        } catch (error) {
            console.error('Error fetching kelas list:', error);
            throw error;
        }
    },

    // Update status perangkat
    async updatePerangkatStatus(perangkatId, newStatus) {
        try {
            const response = await apiClient.patch(`/perangkat/${perangkatId}/status`, {
                status: newStatus,
            });
            // const response = await apiClient.put(`/perangkat/${perangkatId}`, {
            //     status: newStatus,
            // });
            return response.data;
        } catch (error) {
            console.error('Error updating perangkat status:', error);
            throw error;
        }
    },
};