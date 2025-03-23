<template>
    <div class="container mt-4">
      <h3>{{ formData.id ? "Edit" : "Tambah" }} Ruangan</h3>
      <form @submit.prevent="save">
        <div class="mb-3">
          <label class="form-label">Gedung</label>
          <select class="form-control" v-model="formData.gedung_id" @change="loadLantais" required>
            <option value="">-- Silahkan Pilih Gedung --</option>
            <option v-for="gedung in gedungs" :key="gedung.id" :value="gedung.id">{{ gedung.nama }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Lantai</label>
          <select class="form-control" v-model="formData.lantai_id" required>
            <option value="">-- Silahkan Pilih Lantai --</option>
            <option v-for="lantai in lantais" :key="lantai.id" :value="lantai.id">{{ lantai.nomor }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Nama Ruangan</label>
          <input type="text" class="form-control" v-model="formData.name" required />
        </div>
        <button type="submit" class="btn btn-success">Simpan</button>
        <router-link to="/ruangans" class="btn btn-secondary ms-2">Batal</router-link>
      </form>
  
      <!-- **Tombol Tambah Perangkat (Menggunakan Modal)** -->
      <button class="btn btn-warning mt-3" @click="showModal = true">Tambah Perangkat</button>
  
      <!-- **Daftar Perangkat** -->
      <ul class="list-group mt-3">
        <li class="list-group-item d-flex justify-content-between" v-for="perangkat in perangkatList" :key="perangkat.id">
          {{ perangkat.nama }} - {{ perangkat.kategori }}
          <button class="btn btn-danger btn-sm" @click="deletePerangkat(perangkat.id)">Hapus</button>
        </li>
      </ul>
  
      <!-- **Modal Tambah Perangkat** -->
      <PerangkatModal v-if="showModal" @close="showModal = false" :ruanganId="formData.id" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { getRuanganById, saveRuangan } from "@/api/ruangan";
  import { getLantaisByGedung } from "@/api/gedung";
  import { getPerangkatsByRuangan, deletePerangkat } from "@/api/perangkat";
  import PerangkatModal from "@/components/perangkats/PerangkatModal.vue";
  
  const route = useRoute();
  const router = useRouter();
  const gedungs = ref([]);
  const lantais = ref([]);
  const perangkatList = ref([]);
  const showModal = ref(false);
  
  const formData = ref({
    id: null,
    gedung_id: "",
    lantai_id: "",
    name: ""
  });
  
  onMounted(async () => {
    if (route.params.id) {
      const { data } = await getRuanganById(route.params.id);
      formData.value = data;
      await loadLantais();
      await loadPerangkat();
    }
  });
  
  const loadLantais = async () => {
    lantais.value = formData.value.gedung_id ? await getLantaisByGedung(formData.value.gedung_id) : [];
  };
  
  const loadPerangkat = async () => {
    perangkatList.value = await getPerangkatsByRuangan(formData.value.id);
  };
  
  const save = async () => {
    await saveRuangan(formData.value);
    router.push("/ruangans"); // Redirect ke daftar ruangan setelah menyimpan
  };
  </script>
  