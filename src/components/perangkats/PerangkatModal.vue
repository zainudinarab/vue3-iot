<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Perangkat</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePerangkat">
              <div class="mb-3">
                <label class="form-label">Tipe</label>
                <select class="form-control" v-model="form.tipe" required>
                  <option value="relay">Relay</option>
                  <option value="sensor">Sensor</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Nama</label>
                <input type="text" class="form-control" v-model="form.nama" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Kategori</label>
                <select class="form-control" v-model="form.kategori" required>
                  <option value="AC">AC</option>
                  <option value="Lampu">Lampu</option>
                  <option value="sensor_arus">Sensor Arus</option>
                </select>
              </div>
              <button type="submit" class="btn btn-success">Simpan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  import { createPerangkat } from "@/api/perangkat";
  
  const props = defineProps(["ruanganId"]);
  const emit = defineEmits(["close"]);
  
  const form = ref({
    ruangan_id: props.ruanganId,
    tipe: "relay",
    nama: "",
    kategori: "AC"
  });
  
  const savePerangkat = async () => {
    await createPerangkat(form.value);
    emit("close");
  };
  </script>
  
  <style scoped>
  .modal {
    background: rgba(0, 0, 0, 0.5);
  }
  </style>
  