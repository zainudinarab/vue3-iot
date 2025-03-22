<template>
  <div>
    <h1>Manajemen Gedung</h1>

    <!-- Form Tambah Gedung -->
    <div>
      <h2>Tambah Gedung</h2>
      <form @submit.prevent="addGedung">
        <input v-model="newGedung.nama" placeholder="Nama Gedung" required />
        <input v-model="newGedung.keterangan" placeholder="Keterangan" />
        <input v-model="newGedung.jumlah_lantai" placeholder="jumlah_lantai" />
        <button type="submit">Tambah</button>
      </form>
    </div>

    <!-- Tabel Daftar Gedung -->
    <div>
      <h2>Daftar Gedung</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Keterangan</th>
            <th>Jumlah Lantai</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gedung in gedungs" :key="gedung.id">
            <td>{{ gedung.id }}</td>
            <td>{{ gedung.nama }}</td>
            <td>{{ gedung.keterangan }}</td>
            <td>{{ gedung.jumlah_lantai }}</td>
            <td>
              <button @click="editGedung(gedung)">Edit</button>
              <button @click="deleteGedung(gedung.id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Edit Gedung -->
    <div v-if="editingGedung">
      <h2>Edit Gedung</h2>
      <form @submit.prevent="updateGedung">
        <input v-model="editingGedung.nama" placeholder="Nama Gedung" required />
        <input v-model="editingGedung.keterangan" placeholder="Keterangan" />
        <button type="submit">Update</button>
        <button type="button" @click="cancelEdit">Batal</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/api' // Import file API

export default {
  data() {
    return {
      gedungs: [], // Data gedung
      newGedung: { nama: '', keterangan: '' }, // Data baru untuk tambah gedung
      editingGedung: null, // Data yang sedang di-edit
    }
  },
  created() {
    this.fetchGedungs() // Ambil data gedung saat komponen dibuat
  },
  methods: {
    // Ambil data gedung dari API
    async fetchGedungs() {
      try {
        const response = await api.getGedungs()
        this.gedungs = response.data
      } catch (error) {
        console.error('Gagal mengambil data gedung:', error)
      }
    },

    // Tambah gedung baru
    async addGedung() {
      try {
        const response = await api.createGedung(this.newGedung)
        this.gedungs.push(response.data) // Tambahkan ke daftar
        this.newGedung = { nama: '', keterangan: '' } // Reset form
      } catch (error) {
        console.error('Gagal menambah gedung:', error)
      }
    },

    // Edit gedung
    editGedung(gedung) {
      this.editingGedung = { ...gedung } // Salin data gedung ke form edit
    },

    // Update gedung
    async updateGedung() {
      try {
        const response = await api.updateGedung(this.editingGedung.id, this.editingGedung)
        const index = this.gedungs.findIndex((g) => g.id === this.editingGedung.id)
        this.gedungs.splice(index, 1, response.data) // Update data di daftar
        this.cancelEdit() // Reset form edit
      } catch (error) {
        console.error('Gagal mengupdate gedung:', error)
      }
    },

    // Hapus gedung
    async deleteGedung(id) {
      try {
        await api.deleteGedung(id)
        this.gedungs = this.gedungs.filter((g) => g.id !== id) // Hapus dari daftar
      } catch (error) {
        console.error('Gagal menghapus gedung:', error)
      }
    },

    // Batal edit
    cancelEdit() {
      this.editingGedung = null
    },
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
