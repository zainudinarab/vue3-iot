<template>
  <div class="container mt-4">
    <h3>Daftar Ruangan</h3>

    <!-- Tombol Tambah Ruangan -->
    <router-link to="/ruangans/new" class="btn btn-success mb-3">Tambah Ruangan</router-link>

    <!-- Filter dan Pagination Controls -->
    <div class="d-flex justify-content-between mb-3">
      <input
        type="text"
        class="form-control w-50"
        v-model="searchQuery"
        placeholder="Cari Ruangan..."
      />

      <select class="form-select w-25" v-model="itemsPerPage">
        <option value="5">5 per halaman</option>
        <option value="10">10 per halaman</option>
        <option value="20">20 per halaman</option>
      </select>
    </div>

    <!-- Tabel Ruangan -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Nama Ruangan</th>
          <th>Lantai</th>
          <th>Gedung</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ruangan, index) in paginatedRuangans" :key="ruangan.id">
          <td>{{ startIndex + index + 1 }}</td>
          <td>{{ ruangan.name }}</td>
          <td>{{ ruangan.lantai.nomor }}</td>
          <td>{{ ruangan.gedung.nama }}</td>
          <td>
            <router-link :to="`/ruangans/${ruangan.id}`" class="btn btn-primary btn-sm">
              Edit
            </router-link>
            <button class="btn btn-danger btn-sm ms-2" @click="hapusRuangan(ruangan.id)">
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--">Sebelumnya</button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++">Selanjutnya</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getRuangans, deleteRuangan } from '@/api/ruangan'

const ruangans = ref([])
const searchQuery = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

const muatData = async () => {
  ruangans.value = await getRuangans()
}

const hapusRuangan = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus ruangan ini?')) {
    await deleteRuangan(id)
    muatData() // Refresh daftar ruangan
  }
}

// **Filter & Pagination Logic**
const filteredRuangans = computed(() => {
  return ruangans.value.filter((ruangan) =>
    ruangan.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const totalPages = computed(() => Math.ceil(filteredRuangans.value.length / itemsPerPage.value))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)

const paginatedRuangans = computed(() => {
  return filteredRuangans.value.slice(startIndex.value, startIndex.value + itemsPerPage.value)
})

onMounted(muatData)
</script>
