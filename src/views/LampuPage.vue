<!-- LampPage.vue -->
<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>
            Daftar
            <strong>Lampu</strong>
          </h2>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-12 col-sm-6 col-md-2 mt-4" v-for="(lamp, index) in lamps" :key="index">
          <CardLamp :lamp="lamp" @toggle-lamp="toggleLamp(index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Navbar from '@/components/Navbar.vue'
import CardLamp from '@/components/CardLamp.vue' // Import komponen CardLamp

export default {
  components: {
    // Navbar,
    CardLamp,
  },
  data() {
    return {
      lamps: [
        { id: 1, name: 'AC 1', watt: 15, isOn: true },
        { id: 2, name: 'AC 2', watt: 10, isOn: true },
        { id: 3, name: 'Proyektor', watt: 20, isOn: false },
        { id: 4, name: 'Lampu', watt: 25, isOn: false },
        { id: 5, name: 'Lampu Ruang Tamu', watt: 30, isOn: false },
        { id: 6, name: 'Lampu Halaman', watt: 10, isOn: false },
        { id: 7, name: 'Lampu Pagar', watt: 5, isOn: false },
        { id: 8, name: 'Lampu Balkon', watt: 15, isOn: false },
        { id: 9, name: 'Lampu Listrik', watt: 40, isOn: false },
        { id: 10, name: 'Lampu Meja', watt: 10, isOn: false },
      ],
    }
  },
  methods: {
    toggleLamp(index) {
      this.lamps[index].isOn = !this.lamps[index].isOn
    },
  },
}
</script>
