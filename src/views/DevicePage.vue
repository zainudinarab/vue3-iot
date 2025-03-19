<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2><strong>Perangkat</strong> Rumah</h2>
        </div>
      </div>

      <!-- Menampilkan perangkat per kelompok kamar -->
      <div v-for="(devices, room) in rooms" :key="room">
        <div class="row mt-5">
          <div class="col">
            <h3>{{ room }}</h3>
            <!-- Nama Kamar -->
          </div>
        </div>

        <div class="row mb-4">
          <!-- Loop untuk menampilkan perangkat dalam kamar -->
          <div class="col-md-2 mt-4" v-for="device in devices" :key="device.id">
            <CardDevice :device="device" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardDevice from '@/components/CardDevice.vue' // Pastikan ada komponen CardDevice.vue

export default {
  components: {
    CardDevice,
  },
  data() {
    return {
      // Struktur data untuk perangkat per kamar
      rooms: {
        'Kamar Utama': [
          { id: 1, name: 'Lampu', watt: 15, type: 'lamp' },
          { id: 2, name: 'AC', watt: 1000, type: 'ac' },
          { id: 3, name: 'Kipas', watt: 40, type: 'fan' },
        ],
        'Kamar Depan': [
          { id: 4, name: 'Lampu', watt: 20, type: 'lamp' },
          { id: 5, name: 'AC', watt: 900, type: 'ac' },
        ],
        Dapur: [
          { id: 6, name: 'Lampu', watt: 10, type: 'lamp' },
          { id: 7, name: 'Kipas', watt: 35, type: 'fan' },
        ],
      },
    }
  },
}
</script>

<style scoped>
/* Tambahkan style sesuai kebutuhan */
</style>
