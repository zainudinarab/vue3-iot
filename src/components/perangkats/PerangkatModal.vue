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
                <option value="ir">IR (remot)</option>
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

            <!-- Input untuk kode IR -->
            <div v-if="form.tipe === 'ir'" class="mb-3">
              <label class="form-label">Kode IR</label>
              <div class="mb-2">
                <label class="form-label">ON</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.data_tambahan.kode_ir.on"
                  placeholder="0x20DF10EF"
                />
              </div>
              <div class="mb-2">
                <label class="form-label">OFF</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.data_tambahan.kode_ir.off"
                  placeholder="0x20DF40BF"
                />
              </div>
              <div class="mb-2">
                <label class="form-label">Temp Up</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.data_tambahan.kode_ir.temp_up"
                  placeholder="0x20DFA05F"
                />
              </div>
              <div class="mb-2">
                <label class="form-label">Temp Down</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.data_tambahan.kode_ir.temp_down"
                  placeholder="0x20DF609F"
                />
              </div>
            </div>

            <!-- Input untuk data sensor -->
            <div v-if="form.tipe === 'sensor'" class="mb-3">
              <label class="form-label">Data Sensor</label>
              <div class="mb-2">
                <label class="form-label">Suhu</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="form.data_tambahan.sensor.suhu"
                  placeholder="25.5"
                />
              </div>
              <div class="mb-2">
                <label class="form-label">Arus</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="form.data_tambahan.sensor.arus"
                  placeholder="1.23"
                />
              </div>
            </div>

            <button type="submit" class="btn btn-success">Simpan</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { createPerangkat } from '@/api/perangkat'

const props = defineProps(['ruanganId'])
const emit = defineEmits(['close', 'perangkat-ditambahkan'])

const form = ref({
  ruangan_id: props.ruanganId,
  tipe: 'relay',
  nama: '',
  kategori: 'AC',
  data_tambahan: {
    kode_ir: { on: '', off: '', temp_up: '', temp_down: '' }, // Default untuk kode IR
    sensor: { suhu: null, arus: null }, // Default untuk data sensor
  },
})

// Simpan perangkat
const savePerangkat = async () => {
  try {
    // Kirim data ke API
    await createPerangkat(form.value)

    // Emit event untuk memperbarui daftar perangkat
    emit('perangkat-ditambahkan')
    emit('close') // Tutup modal
  } catch (error) {
    console.error('Gagal menyimpan perangkat:', error)
    alert('Terjadi kesalahan saat menyimpan perangkat.')
  }
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
