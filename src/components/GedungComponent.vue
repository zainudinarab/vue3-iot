<template>
  <div>
    <h1>Daftar Gedung</h1>

    <!-- Tabel Gedung -->
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
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form untuk menambah Gedung -->
    <h2>Tambah Gedung</h2>
    <form @submit.prevent="addGedung">
      <div>
        <label for="nama">Nama Gedung:</label>
        <input v-model="newGedung.nama" type="text" id="nama" required />
      </div>
      <div>
        <label for="keterangan">Keterangan:</label>
        <input v-model="newGedung.keterangan" type="text" id="keterangan" />
      </div>
      <div>
        <label for="jumlah_lantai">Jumlah Lantai:</label>
        <input v-model="newGedung.jumlah_lantai" type="number" id="jumlah_lantai" required />
      </div>
      <button type="submit">Tambah Gedung</button>
    </form>
  </div>
</template>

<script>
// Mengimpor API functions dari file api.js
import { getGedungs, createGedung, deleteGedung } from '@/api/api'

export default {
  data() {
    return {
      gedungs: [], // Untuk menyimpan daftar gedung
      newGedung: {
        // Data gedung baru yang akan ditambahkan
        nama: '',
        keterangan: '',
        jumlah_lantai: null,
      },
    }
  },
  created() {
    this.fetchGedungs() // Panggil API untuk mengambil data gedung saat komponen dibuat
  },
  methods: {
    // Ambil data gedung dari API
    async fetchGedungs() {
      try {
        this.gedungs = await getGedungs() // Memanggil API untuk mendapatkan daftar gedung
      } catch (error) {
        console.error('Error fetching gedungs:', error)
      }
    },

    // Fungsi untuk menambah gedung
    async addGedung() {
      try {
        const newGedung = await createGedung(this.newGedung) // Panggil API untuk menambah gedung
        this.gedungs.push(newGedung) // Menambahkan gedung baru ke dalam daftar
        this.newGedung = { nama: '', keterangan: '', jumlah_lantai: null } // Reset form setelah berhasil menambah gedung
      } catch (error) {
        console.error('Error adding gedung:', error)
      }
    },

    // Fungsi untuk menghapus gedung
    async deleteGedung(id) {
      try {
        await deleteGedung(id) // Panggil API untuk menghapus gedung
        this.gedungs = this.gedungs.filter((gedung) => gedung.id !== id) // Menghapus gedung dari daftar lokal
      } catch (error) {
        console.error('Error deleting gedung:', error)
      }
    },
  },
}
</script>

<style scoped>
/* Styling tabel dan form */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
}

button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}

form {
  margin-top: 20px;
}

label {
  display: block;
  margin-top: 10px;
}

input {
  padding: 5px;
  width: 100%;
}
</style>
