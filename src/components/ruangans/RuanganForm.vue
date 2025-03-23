<template>
  <div class="container mt-4">
    <h3>{{ isEdit ? 'Edit' : 'Tambah' }} Ruangan</h3>

    <form @submit.prevent="save">
      <div class="mb-3">
        <label class="form-label">Gedung</label>
        <select class="form-control" v-model="formData.gedung_id" @change="loadLantais" required>
          <option value="">-- Silahkan Pilih Gedung --</option>
          <option v-for="gedung in gedungs" :key="gedung.id" :value="gedung.id">
            {{ gedung.nama }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Lantai</label>
        <select class="form-control" v-model="formData.lantai_id" required>
          <option value="">-- Silahkan Pilih Lantai --</option>
          <option v-for="lantai in lantais" :key="lantai.id" :value="lantai.id">
            {{ lantai.nomor }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Nama Ruangan</label>
        <input type="text" class="form-control" v-model="formData.name" required />
        <!-- Menampilkan pesan error jika ada error pada nama -->
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>

      <button type="submit" class="btn btn-success">Simpan</button>
      <router-link to="/ruangans" class="btn btn-secondary ms-2">Kembali</router-link>
    </form>

    <div v-if="isEdit">
      <h4 class="mt-4">Daftar Perangkat</h4>
      <button class="btn btn-primary mb-3" @click="bukaModalPerangkat">Tambah Perangkat</button>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Perangkat</th>
            <th>Tipe</th>
            <th>Kategori</th>
            <th>MQTT Topic</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(perangkat, index) in perangkats" :key="perangkat.id">
            <td>{{ index + 1 }}</td>
            <td>{{ perangkat.nama }}</td>
            <td>{{ perangkat.tipe }}</td>
            <td>{{ perangkat.kategori }}</td>
            <td>{{ perangkat.topic_mqtt }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="hapusPerangkat(perangkat.id)">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <PerangkatModal
      v-if="modalPerangkat"
      :ruanganId="formData.id"
      @close="modalPerangkat = false"
      @perangkat-ditambahkan="loadPerangkats"
    />
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getRuanganById, saveRuangan } from '@/api/ruangan'
import { getLantaisByGedung } from '@/api/gedung'
import { getGedungs } from '@/api/gedung' // Pastikan ada API ini
import { getPerangkatsByRuangan, deletePerangkat } from '@/api/perangkat'
import PerangkatModal from '@/components/perangkats/PerangkatModal.vue'

const route = useRoute()
const router = useRouter()

const formData = ref({ id: null, gedung_id: '', lantai_id: '', name: '' })
const gedungs = ref([]) // Menyimpan daftar gedung
const lantais = ref([]) // Menyimpan daftar lantai
const perangkats = ref([]) // Daftar perangkat
const errors = ref({}) // Menyimpan errors yang diterima dari server
const modalPerangkat = ref(false)
const isEdit = ref(false)

// Memuat gedung
const loadGedungs = async () => {
  gedungs.value = await getGedungs()
}

// Memuat lantai berdasarkan gedung
const loadLantais = async () => {
  if (formData.value.gedung_id) {
    lantais.value = await getLantaisByGedung(formData.value.gedung_id)
  } else {
    lantais.value = []
  }
}

// Memuat data jika melakukan edit
const loadData = async () => {
  await loadGedungs()

  if (route.params.id) {
    isEdit.value = true
    formData.value = await getRuanganById(route.params.id)
    perangkats.value = await getPerangkatsByRuangan(route.params.id)
    await loadLantais()
  }
}

// Menyimpan data ruangan
const save = async () => {
  try {
    // Memastikan formData sudah valid
    if (!formData.value.name || !formData.value.gedung_id || !formData.value.lantai_id) {
      console.error('Data form tidak lengkap!')
      return
    }

    // Mengirim data untuk disimpan
    await saveRuangan(formData.value)
    router.push('/ruangans')
  } catch (error) {
    console.error('Terjadi kesalahan saat menyimpan ruangan:', error)

    // Menangani error dari server (misalnya validasi nama ruangan)
    if (error.response && error.response.data && error.response.data.errors) {
      const serverErrors = error.response.data.errors
      if (serverErrors.name && serverErrors.name.length > 0) {
        errors.value.name = serverErrors.name[0] // Menampilkan pesan error server
      }
    }
  }
}

// Menghapus perangkat
const hapusPerangkat = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus perangkat ini?')) {
    await deletePerangkat(id)
    perangkats.value = await getPerangkatsByRuangan(formData.value.id)
  }
}

// Membuka modal perangkat
const bukaModalPerangkat = () => {
  modalPerangkat.value = true
}

// Memuat data saat komponen di-mount
onMounted(loadData)
</script>
