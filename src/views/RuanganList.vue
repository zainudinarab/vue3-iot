<template>
    <div class="container mt-4">
      <h3>Daftar Ruangan</h3>
      
      <!-- Tombol Tambah Ruangan -->
      <router-link to="/ruangans/new" class="btn btn-success mb-3">Tambah Ruangan</router-link>
  
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
          <tr v-for="(ruangan, index) in ruangans" :key="ruangan.id">
            <td>{{ index + 1 }}</td>
            <td>{{ ruangan.name }}</td>
            <td>{{ ruangan.lantai.nomor }}</td>
            <td>{{ ruangan.lantai.gedung.nama }}</td>
            <td>
              <router-link :to="`/ruangans/${ruangan.id}`" class="btn btn-primary btn-sm">
                Edit
              </router-link>
              <button class="btn btn-danger btn-sm ms-2" @click="hapusRuangan(ruangan.id)">
                Hapus
              </button>
              <button class="btn btn-warning btn-sm ms-2" @click="bukaModalPerangkat(ruangan.id)">
                Kelola Perangkat
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal Perangkat -->
      <PerangkatModal v-if="modalPerangkat" :ruanganId="selectedRuanganId" @close="modalPerangkat = false" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { getRuangans, deleteRuangan } from "@/api/ruangan";
  import PerangkatModal from "@/components/perangkats/PerangkatModal.vue";
  
  const ruangans = ref([]);
  const modalPerangkat = ref(false);
  const selectedRuanganId = ref(null);
  
  const muatData = async () => {
    ruangans.value = await getRuangans();
  };
  
  const hapusRuangan = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus ruangan ini?")) {
      await deleteRuangan(id);
      muatData(); // Refresh daftar ruangan
    }
  };
  
  const bukaModalPerangkat = (ruanganId) => {
    selectedRuanganId.value = ruanganId;
    modalPerangkat.value = true;
  };
  
  onMounted(muatData);
  </script>
  