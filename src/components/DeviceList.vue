<template>
    <div class="card shadow card-product">
        <div class="card-header">
            <h5>Kelas </h5>
        </div>
        <div class="lamp-icon" :style="{ backgroundColor: device.status ? 'green' : 'red' }">
            <div class="watt-text">{{ device.watt }}W</div>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ device.nama }}</h5>
            <p class="card-text">Status: {{ device.status ? 'Nyala' : 'Mati' }}</p>

            <label class="switch">
                <input type="checkbox" v-model="device.status" @change="toggleLamp" :disabled="!device.topic_mqtt" />
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
        device: Object, // Menerima data perangkat
    },
    data() {
        return {
            client: null,
        };
    },
    mounted() {
        // Jika perangkat memiliki topic_mqtt, berlangganan pada topik tersebut
        if (this.device.topic_mqtt) {
            this.connectMQTT();
        }
    },
    methods: {
        connectMQTT() {
            // Hubungkan ke broker MQTT
            this.client = mqtt.connect('ws://103.133.56.181:10381', {
                username: 'puskomnet',
                password: 'puskomnet123',
            });

            this.client.on('connect', () => {
                console.log('Terhubung ke broker MQTT');

                // Subscribe ke topik perangkat
                this.client.subscribe(this.device.topic_mqtt, (err) => {
                    if (!err) {
                        // console.log(`Berhasil subscribe topik ${this.device.topic_mqtt}`);
                    }
                });
            });

            // Update status perangkat berdasarkan pesan yang diterima
            this.client.on('message', (topic, message) => {
                if (topic === this.device.topic_mqtt) {
                    const status = message.toString() === '1'; // Misalnya 1 berarti ON, 0 berarti OFF
                    this.device.status = status; // Update status perangkat
                    console.log(`Berhasil subscribe ke topik ${this.device.status}`);
                }
            });
        },

        toggleLamp() {
            // Kirim status terbaru ke broker MQTT
            const message = this.device.status ? '1' : '0';
            this.client.publish(this.device.topic_mqtt, message);
        },
    },
};
</script>

<style scoped>
.card {
    width: 18rem;
    margin: 10px;
}

.lamp-icon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
    background-color: red;
    /* Default mati */
    transition: background-color 0.3s ease;
}

.watt-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 16px;
    font-weight: bold;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: #2ecc71;
    /* Warna hijau saat nyala */
}

input:checked+.slider:before {
    transform: translateX(26px);
}
</style>