<template>
    <div class="card shadow card-product">
        <div class="lamp-icon" :style="{ backgroundColor: device.status === 1 ? 'green' : 'red' }">
            <div class="watt-text">{{ device.status ? 'ON' : 'OFF' }}</div>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ device.nama }}</h5>
            <p class="card-text">Status: {{ device.status ? 'Nyala' : 'Mati' }}</p>

            <label class="switch">
                <input type="checkbox" v-model="device.status" @change="toggleDevice" :disabled="!device.topic_mqtt" />
                <span class="slider"></span>
            </label>
        </div>
    </div>
</template>

<script>
import mqtt from 'mqtt';

export default {
    name: 'DeviceCard',
    props: {
        device: Object,
    },
    data() {
        return {
            client: null,
        };
    },
    mounted() {
        if (this.device.topic_mqtt) {
            this.connectMQTT();
        }
    },
    methods: {
        connectMQTT() {
            this.client = mqtt.connect('ws://103.133.56.181:10381', {
                username: 'puskomnet',
                password: 'puskomnet123',
            });

            this.client.on('connect', () => {
                this.client.subscribe(this.device.topic_mqtt);
            });

            this.client.on('message', (topic, message) => {
                if (topic === this.device.topic_mqtt) {
                    this.device.status = message.toString() === '1';
                }
            });
        },
        toggleDevice() {
            const message = this.device.status ? '1' : '0';
            this.client.publish(this.device.topic_mqtt, message);
        },
    },
};
</script>