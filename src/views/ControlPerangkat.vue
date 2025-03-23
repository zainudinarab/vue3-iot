<template>
  <div class="container">
    <div class="row">
      <!-- Filter Dropdown untuk Gedung -->
      <div class="col-md-12 mb-3">
        <label for="gedungFilter">Filter berdasarkan Gedung</label>
        <select v-model="selectedGedung" id="gedungFilter" class="form-select">
          <option value="">Semua Gedung</option>
          <!-- Daftar gedung yang unik diambil dari ruanganList -->
          <option v-for="gedung in gedungOptions" :key="gedung.id" :value="gedung.id">
            {{ gedung.nama }}
          </option>
        </select>
      </div>

      <!-- Daftar Ruangan yang sudah difilter berdasarkan gedung -->
      <div v-for="ruangan in filteredRuanganList" :key="ruangan.id" class="col-md-3 mb-2">
        <PerangkatCard :kelas="ruangan" @toggle-perangkat="togglePerangkat" />
      </div>
    </div>
  </div>
</template>

<script>
import PerangkatCard from '@/components/perangkats/PerangkatCard.vue'
import { getRuangan, updatePerangkatStatus } from '@/api/perangkat'
import mqtt from 'mqtt'

export default {
  components: {
    PerangkatCard,
  },
  data() {
    return {
      ruanganList: [], // Daftar semua ruangan
      selectedGedung: '', // Gedung yang dipilih untuk filter
      gedungOptions: [], // Daftar gedung untuk filter
      mqttClient: null,
    }
  },
  computed: {
    // Daftar ruangan yang sudah difilter berdasarkan gedung yang dipilih
    filteredRuanganList() {
      if (this.selectedGedung) {
        return this.ruanganList.filter((ruangan) => ruangan.gedung.id === this.selectedGedung)
      }
      return this.ruanganList // Jika tidak ada filter, tampilkan semua ruangan
    },
  },
  async created() {
    await this.fetchData() // Ambil data dari API
    this.connectMQTT()
  },
  methods: {
    async fetchData() {
      try {
        this.ruanganList = await getRuangan() // Ambil data ruangan dari API

        // Mengelompokkan ruangan berdasarkan gedung
        const gedungMap = new Map()
        this.ruanganList.forEach((ruangan) => {
          const gedungId = ruangan.gedung.id
          if (!gedungMap.has(gedungId)) {
            gedungMap.set(gedungId, ruangan.gedung) // Menambahkan gedung ke Map (unik)
          }
        })
        this.gedungOptions = Array.from(gedungMap.values()) // Mengambil gedung unik
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    connectMQTT() {
      this.mqttClient = mqtt.connect('ws://103.133.56.181:10381', {
        username: 'puskomnet',
        password: 'puskomnet123',
      })

      this.mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker')
        this.subscribeToTopics()
      })

      this.mqttClient.on('message', (topic, message) => {
        this.handleMQTTMessage(topic, message.toString())
      })
    },
    subscribeToTopics() {
      this.ruanganList.forEach((ruangan) => {
        Object.values(ruangan.perangkat_relay).forEach((perangkat) => {
          if (perangkat.topic_mqtt) {
            this.mqttClient.subscribe(perangkat.topic_mqtt)
          }
        })
        Object.values(ruangan.perangkat_sensor).forEach((perangkat) => {
          if (perangkat.topic_mqtt) {
            this.mqttClient.subscribe(perangkat.topic_mqtt)
          }
        })
      })
    },
    handleMQTTMessage(topic, message) {
      this.ruanganList.forEach((ruangan) => {
        Object.values(ruangan.perangkat_relay).forEach((perangkat) => {
          if (perangkat.topic_mqtt === topic) {
            perangkat.status = parseInt(message, 10)
            console.log(`Status perangkat ${perangkat.nama} diperbarui menjadi: ${message}`)
          }
        })
        Object.values(ruangan.perangkat_sensor).forEach((perangkat) => {
          if (perangkat.topic_mqtt === topic) {
            perangkat.status = parseInt(message, 10)
          }
        })
      })
    },
    async togglePerangkat(perangkat) {
      if (perangkat.topic_mqtt) {
        const newStatus = perangkat.status ? 0 : 1
        try {
          await updatePerangkatStatus(perangkat.id, newStatus)
          perangkat.status = newStatus
        } catch (error) {
          console.error('Error updating perangkat status:', error)
        }
      }
    },
  },
}
</script>
