<template>
  <div class="container">
    <h1>Daftar Gedung</h1>
    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>Nama Gedung</th>
          <th>Keterangan</th>
          <th>Jumlah Lantai</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="gedung in gedungs" :key="gedung.id">
          <td>{{ gedung.nama }}</td>
          <td>{{ gedung.keterangan }}</td>
          <td>{{ gedung.jumlah_lantai }}</td>
          <td>
            <button @click="deleteGedung(gedung.id)">Hapus</button>
            <router-link :to="{ name: 'edit-gedung', params: { id: gedung.id } }">
              Edit
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/create-gedung">Tambah Gedung</router-link>
  </div>
</template>

<script>
import api from '@/api/api' // Mengimpor API yang berisi Object Method

export default {
  data() {
    return {
      gedungs: [], // Menyimpan data gedung
    }
  },
  created() {
    this.fetchGedungs() // Mengambil daftar gedung saat komponen dibuat
  },
  methods: {
    // Fungsi untuk mengambil data gedung
    async fetchGedungs() {
      try {
        this.gedungs = await api.getGedungs() // Menggunakan Object Method untuk mengambil data
      } catch (error) {
        console.error('Error fetching gedungs:', error)
      }
    },

    // Fungsi untuk menghapus gedung
    async deleteGedung(id) {
      try {
        await api.deleteGedung(id) // Menggunakan Object Method untuk menghapus gedung
        this.gedungs = this.gedungs.filter((gedung) => gedung.id !== id) // Menghapus dari list lokal
      } catch (error) {
        console.error('Error deleting gedung:', error)
      }
    },
  },
}
</script>
