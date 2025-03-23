<template>
  <div class="container mt-4">
    <h2>Daftar Gedung</h2>
    <button class="btn btn-primary mb-3" @click="showForm(null)">Tambah Gedung</button>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nama Gedung</th>
          <th>Jumlah Lantai</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="gedung in gedungs" :key="gedung.id">
          <td>{{ gedung.id }}</td>
          <td>{{ gedung.nama }}</td>
          <td>{{ gedung.jumlah_lantai }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="showForm(gedung)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(gedung.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <GedungForm :gedung="selectedGedung" @saved="loadGedungs" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getGedungs, deleteGedung } from "@/api/gedung";
import GedungForm from "@/components/gedungs/GedungForm.vue";
import { Modal } from "bootstrap";

const gedungs = ref([]);
const selectedGedung = ref(null);

const loadGedungs = async () => gedungs.value = await getGedungs();

const showForm = (gedung) => {
  selectedGedung.value = gedung;
  const modal = new Modal(document.getElementById("gedungModal"));
  modal.show();
};

const confirmDelete = async (id) => {
  if (confirm("Hapus gedung ini?")) {
    await deleteGedung(id);
    loadGedungs();
  }
};

onMounted(loadGedungs);
</script>
