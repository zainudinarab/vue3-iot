<!-- src/components/MqttClient.vue -->
<template>
  <div>
    <h2>MQTT Messages</h2>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        <strong>Topic:</strong> {{ msg.topic }}, <strong>Message:</strong> {{ msg.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import mqtt from 'mqtt'

export default {
  data() {
    return {
      messages: [],
      client: null,
    }
  },
  mounted() {
    // Koneksi ke broker MQTT (WebSocket)
    this.client = mqtt.connect('ws://103.133.56.181:10381', {
      username: 'puskomnet', // Ganti dengan username Anda
      password: 'puskomnet123', // Ganti dengan password Anda
    })

    this.client.on('connect', () => {
      this.client.subscribe('topic') // Ganti dengan topik yang diinginkan
    })

    this.client.on('message', (topic, message) => {
      this.messages.push({
        topic,
        message: message.toString(),
      })
    })
  },
  beforeDestroy() {
    if (this.client) {
      this.client.end() // Putuskan koneksi saat komponen di-unmount
    }
  },
}
</script>
