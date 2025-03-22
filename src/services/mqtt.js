import mqtt from 'mqtt';

class MQTTService {
    constructor() {
        this.client = null;
        this.callbacks = {}; // Untuk menyimpan callback berdasarkan topik
    }

    // Hubungkan ke broker MQTT
    connect() {
        this.client = mqtt.connect('ws://103.133.56.181:10381', {
            username: 'puskomnet',
            password: 'puskomnet123',
        });

        // Handle koneksi berhasil
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
        });

        // Handle error koneksi
        this.client.on('error', (error) => {
            console.error('MQTT connection error:', error);
        });

        // Handle pesan masuk
        this.client.on('message', (topic, message) => {
            if (this.callbacks[topic]) {
                this.callbacks[topic](message.toString());
            }
        });
    }

    // Subscribe ke topik dan tambahkan callback
    subscribe(topic, callback) {
        if (!this.client || !this.client.connected) {
            console.error('MQTT client is not connected');
            return;
        }

        this.client.subscribe(topic, (err) => {
            if (!err) {
                console.log(`Subscribed to ${topic}`);
                this.callbacks[topic] = callback; // Simpan callback untuk topik ini
            } else {
                console.error(`Failed to subscribe to ${topic}:`, err);
            }
        });
    }

    // Publish pesan ke topik
    publish(topic, message) {
        if (!this.client || !this.client.connected) {
            console.error('MQTT client is not connected');
            return;
        }

        this.client.publish(topic, message, (err) => {
            if (!err) {
                console.log(`Published to ${topic}: ${message}`);
            } else {
                console.error(`Failed to publish to ${topic}:`, err);
            }
        });
    }

    // Hentikan koneksi MQTT
    disconnect() {
        if (this.client) {
            this.client.end();
            console.log('Disconnected from MQTT broker');
        }
    }
}

// Ekspor instance tunggal (singleton) dari MQTTService
export default new MQTTService();