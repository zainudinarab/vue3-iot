<template>
    <div class="modal fade" id="ruanganModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">{{ formData.id ? "Edit" : "Tambah" }} Ruangan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="mb-3">
                <label class="form-label">Gedung</label>
                <select class="form-control" v-model="formData.gedung_id" @change="loadLantais" required>
                  <option value="">-- Silahkan Pilih Gedung --</option>
                  <option v-for="gedung in gedungs" :key="gedung.id" :value="gedung.id">{{ gedung.nama }}</option>
                </select>
                <div v-if="errors.gedung_id" class="text-danger">{{ errors.gedung_id }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Lantai</label>
                <select class="form-control" v-model="formData.lantai_id" required>
                  <option value="">-- Silahkan Pilih Lantai --</option>
                  <option v-for="lantai in lantais" :key="lantai.id" :value="lantai.id">{{ lantai.nomor }}</option>
                </select>
                <div v-if="errors.lantai_id" class="text-danger">{{ errors.lantai_id }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Nama Ruangan</label>
                <input type="text" class="form-control" v-model="formData.name" required />
                <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
              </div>

              <hr />

              <!-- 🔹 Tabel Perangkat -->
              <div class="mb-3">
                <h5>Daftar Perangkat</h5>
                <button type="button" class="btn btn-sm btn-primary mb-2" @click="addPerangkat">Tambah Perangkat</button>
                <table class="table table-bordered">
                  <thead class="table-light">
                    <tr>
                      <th>#</th>
                      <th>Nama</th>
                      <th>Tipe</th>
                      <th>Kategori</th>
                      <th>Nomor Urut</th>
                      <th>MQTT</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(perangkat, index) in perangkats" :key="perangkat.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ perangkat.nama }}</td>
                      <td>{{ perangkat.tipe }}</td>
                      <td>{{ perangkat.kategori }}</td>
                      <td>{{ perangkat.nomor_urut }}</td>
                      <td>{{ perangkat.topic_mqtt }}</td>
                      <td>
                        <span :class="['badge', perangkat.status ? 'bg-success' : 'bg-danger']">
                          {{ perangkat.status ? "Aktif" : "Nonaktif" }}
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-warning me-1" @click="editPerangkat(perangkat)">Edit</button>
                        <button class="btn btn-sm btn-danger" @click="deletePerangkat(perangkat.id)">Hapus</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button type="submit" class="btn btn-success">Simpan</button>
              <button type="button" class="btn btn-secondary ms-2" data-bs-dismiss="modal">Batal</button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { saveRuangan, getPerangkatsByRuangan, deletePerangkat } from "@/api/ruangan";
import { deletePerangkat as apiDeletePerangkat } from "@/api/perangkat";
import { getLantaisByGedung } from "@/api/gedung"; 
import { Modal } from "bootstrap";

const props = defineProps(["ruangan", "gedungs"]);
const emit = defineEmits(["saved"]);

const formData = ref({ id: null, gedung_id: "", lantai_id: "", name: "" });
const lantais = ref([]);
const perangkats = ref([]); // Menyimpan daftar perangkat
const errors = ref({});

watch(() => props.ruangan, async (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
    if (formData.value.gedung_id) {
      await loadLantais();
    }
    if (formData.value.id) {
      await loadPerangkats();
    }
  } else {
    formData.value = { id: null, gedung_id: "", lantai_id: "", name: "" };
    lantais.value = [];
    perangkats.value = [];
    errors.value = {};
  }
});

const loadLantais = async () => {
  if (formData.value.gedung_id) {
    lantais.value = await getLantaisByGedung(formData.value.gedung_id);
  } else {
    lantais.value = [];
  }
};

const loadPerangkats = async () => {
  if (formData.value.id) {
    perangkats.value = await getPerangkatsByRuangan(formData.value.id);
  }
};

const save = async () => {
  try {
    errors.value = {};
    await saveRuangan(formData.value);
    emit("saved");
    closeModal();
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors;
    } else {
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  }
};

const deletePerangkatd = async (id) => { 
    if (confirm("Apakah Anda yakin ingin menghapus perangkat ini?")) {
        try {
            await apiDeletePerangkat(id);
            alert("Perangkat berhasil dihapus.");
            // Tambahkan logika untuk refresh data perangkat di sini
        } catch (error) {
            alert("Gagal menghapus perangkat: " + (error.response?.data?.message || error.message));
        }
    }
};

const addPerangkat = () => {
  alert("Tambahkan form atau modal untuk input perangkat baru.");
};

const editPerangkat = (perangkat) => {
  alert(`Edit perangkat: ${perangkat.nama}`);
};

const closeModal = () => {
  const modal = Modal.getInstance(document.getElementById("ruanganModal"));
  modal.hide();
};
</script>
