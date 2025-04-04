<template>
    <div>
      <h3>Payload Biner Dikirim:</h3>
      <div v-if="payload">
        <p>Ukuran: {{ payload.length }} bytes</p>
        <pre>{{ formatHex(payload) }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import mqtt from "mqtt";
  
  export default {
    data() {
      return {
        payload: null,
        client: null
      };
    },
    methods: {
      formatHex(buffer) {
        return Array.from(new Uint8Array(buffer))
          .map(b => b.toString(16).padStart(2, '0'))
          .join(' ');
      }
    },
    mounted() {
      this.client = mqtt.connect('ws://103.133.56.181:10381', {
        username: 'puskomnet',
        password: 'puskomnet123',
      });
      
      this.client.subscribe("test/topic");
      this.client.on("message", (topic, message) => {
        this.payload = message;
      });
    },
    beforeDestroy() {
      this.client.end();
    }
  };
  </script>