<template>
  <div class="container mt-4">
    <!-- Title -->
    <h1 class="text-center mb-4">MQTT Client dengan Vue.js</h1>

    <!-- Menampilkan pesan yang diterima -->
    <div class="card mb-4">
      <div class="card-header">
        <h2 class="card-title">Pesan yang Diterima:</h2>
      </div>
      <div class="card-body">
        <p>{{ receivedMessage || 'Tidak ada pesan diterima' }}</p>
      </div>
    </div>

    <!-- Form untuk mengirim pesan -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Kirim Pesan:</h2>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="publishMessage">Pesan:</label>
          <input
            type="text"
            id="publishMessage"
            v-model="publishMessage"
            class="form-control"
            placeholder="Masukkan pesan"
          />
        </div>
        <button @click="publish" class="btn btn-primary w-100">Kirim</button>
      </div>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt' // Import library MQTT

export default {
  data() {
    return {
      receivedMessage: 'Menunggu pesan...', // Pesan yang diterima dari MQTT
      publishMessage: '', // Pesan yang akan dikirim
      client: null, // Objek MQTT client
    }
  },
  mounted() {
    // Hubungkan ke broker MQTT
    // this.client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt') // Ganti dengan broker Anda
    this.client = mqtt.connect('ws://103.133.56.181:10381', {
      username: 'puskomnet', // Ganti dengan username Anda
      password: 'puskomnet123', // Ganti dengan password Anda
    })
    // Handle event ketika terhubung
    this.client.on('connect', () => {
      console.log('Terhubung ke broker MQTT')
      // Subscribe ke topik tertentu
      this.client.subscribe('kamar/201', (err) => {
        if (!err) {
          console.log('Berhasil subscribe ke topik your/topic')
        }
      })
    })

    // Handle event ketika menerima pesan
    this.client.on('message', (topic, message) => {
      this.receivedMessage = message.toString() // Tampilkan pesan yang diterima
    })

    // Handle event error
    this.client.on('error', (error) => {
      console.error('Error MQTT:', error)
    })
  },
  methods: {
    // Method untuk mengirim pesan (publish)
    publish() {
      if (this.publishMessage) {
        this.client.publish('kamar/201', this.publishMessage) // Kirim pesan ke topik
        this.publishMessage = '' // Kosongkan input setelah mengirim
      }
    },
  },
  beforeDestroy() {
    // Pastikan untuk memutuskan koneksi MQTT saat komponen dihancurkan
    if (this.client) {
      this.client.end()
    }
  },
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
