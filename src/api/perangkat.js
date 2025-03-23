import api from "./axios"; // Menggunakan konfigurasi axios yang sudah ada

export const getPerangkats = async (ruanganId) => {
    return await api.get(`/perangkats?ruangan_id=${ruanganId}`);
};

export const getPerangkatById = async (id) => {
    return await api.get(`/perangkats/${id}`);
};

export const createPerangkat = async (data) => {
    return await api.post("/perangkats", data);
};

export const updatePerangkat = async (id, data) => {
    return await api.put(`/perangkats/${id}`, data);
};

export const deletePerangkat = async (id) => {
    return await api.delete(`/perangkats/${id}`);
};
