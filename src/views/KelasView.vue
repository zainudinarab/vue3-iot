<template>
  <div class="container">
    <div class="row">
      <div v-for="kelas in kelasList" :key="kelas.id" class="col-md-4 mb-3">
        <PerangkatCard :kelas="kelas" @toggle-perangkat="togglePerangkat" />
      </div>
    </div>
  </div>
</template>

<script>
import PerangkatCard from '@/components/PerangkatCard.vue'
import api from '@/api/api' // Pastikan path-nya benar
// import mqtt from '@/services/mqtt';
import mqtt from 'mqtt'

export default {
  components: {
    PerangkatCard,
  },
  data() {
    return {
      kelasList: [],
      mqttClient: null,
    }
  },
  async created() {
    await this.fetchData()
    this.connectMQTT()
  },
  methods: {
    async fetchData() {
      try {
        //   const response = await fetch('http://iot-unipdu.test/api/kelas');
        this.kelasList = await api.getRuangan()
        //   this.kelasList = await response.json();
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
      this.kelasList.forEach((kelas) => {
        Object.values(kelas.perangkat_relay).forEach((perangkat) => {
          if (perangkat.topic_mqtt) {
            this.mqttClient.subscribe(perangkat.topic_mqtt)
          }
        })
        Object.values(kelas.perangkat_sensor).forEach((perangkat) => {
          if (perangkat.topic_mqtt) {
            this.mqttClient.subscribe(perangkat.topic_mqtt)
            //   console.log('Connected to MQTT broker');
          }
        })
      })
    },
    handleMQTTMessage(topic, message) {
      this.kelasList.forEach((kelas) => {
        Object.values(kelas.perangkat_relay).forEach((perangkat) => {
          if (perangkat.topic_mqtt === topic) {
            perangkat.status = parseInt(message, 10)
            console.log(`Status perangkat ${perangkat.nama} diperbarui menjadi: ${message}`)
          }
        })
        Object.values(kelas.perangkat_sensor).forEach((perangkat) => {
          if (perangkat.topic_mqtt === topic) {
            perangkat.status = parseInt(message, 10)
          }
        })
      })
    },
    async togglePerangkat(perangkat) {
      if (perangkat.topic_mqtt) {
        const newStatus = perangkat.status ? 0 : 1 // Toggle status
        await api.updatePerangkatStatus(perangkat.id, newStatus) // Update status di API
        // this.mqttClient.publish(perangkat.topic_mqtt, newStatus.toString());
        perangkat.status = newStatus // Update status lokal
      }
    },
  },
}
</script>
