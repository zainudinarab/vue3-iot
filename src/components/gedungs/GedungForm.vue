<template>
    <div class="modal fade" id="gedungModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">{{ formData.id ? "Edit" : "Tambah" }} Gedung</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="mb-3">
                <label class="form-label">Nama Gedung</label>
                <input type="text" class="form-control" v-model="formData.nama" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Jumlah Lantai</label>
                <input type="number" class="form-control" v-model="formData.jumlah_lantai" required />
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
  import { saveGedung } from "@/api/gedung";
  import { Modal } from "bootstrap";
  
  const props = defineProps(["gedung"]);
  const emit = defineEmits(["saved"]);
  const formData = ref({ id: null, nama: "", jumlah_lantai: 0 });
  
  watch(() => props.gedung, (newVal) => {
    formData.value = newVal ? { ...newVal } : { id: null, nama: "", jumlah_lantai: 0 };
  });
  
  const save = async () => {
    await saveGedung(formData.value);
    emit("saved");
    closeModal();
  };
  
  const closeModal = () => {
    const modal = Modal.getInstance(document.getElementById("gedungModal"));
    modal.hide();
  };
  </script>
  