<template>
  <div>
    <h1>{{ isEdit ? 'Edit Gedung' : 'Tambah Gedung' }}</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="nama">Nama Gedung:</label>
        <input v-model="gedungData.nama" type="text" id="nama" required />
      </div>
      <div>
        <label for="keterangan">Keterangan:</label>
        <input v-model="gedungData.keterangan" type="text" id="keterangan" />
      </div>
      <div>
        <label for="jumlah_lantai">Jumlah Lantai:</label>
        <input v-model="gedungData.jumlah_lantai" type="number" id="jumlah_lantai" required />
      </div>
      <button type="submit">{{ isEdit ? 'Update Gedung' : 'Tambah Gedung' }}</button>
    </form>
  </div>
</template>

<script>
import api from '@/api/api' // Mengimpor API yang berisi Object Method

export default {
  data() {
    return {
      gedungData: {
        nama: '',
        keterangan: '',
        jumlah_lantai: null,
      },
      isEdit: false, // Menandakan apakah ini form edit atau tambah
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.isEdit = true
      this.fetchGedung(id) // Ambil data gedung untuk diedit jika ID ada
    }
  },
  methods: {
    // Ambil data gedung untuk diedit berdasarkan ID
    async fetchGedung(id) {
      try {
        const gedung = await api.getGedung(id) // Mengambil gedung untuk edit
        this.gedungData = gedung
      } catch (error) {
        console.error('Error fetching gedung:', error)
      }
    },

    // Kirim data form ke API (untuk tambah atau edit)
    async submitForm() {
      try {
        if (this.isEdit) {
          await api.updateGedung(this.$route.params.id, this.gedungData) // Update gedung jika edit
        } else {
          await api.createGedung(this.gedungData) // Tambah gedung baru
        }
        this.$router.push('/') // Setelah submit, kembali ke halaman daftar gedung
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
  },
}
</script>
