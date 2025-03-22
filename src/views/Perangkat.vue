<template>
    <div>
        <div class="device-list">
            <DeviceCard v-for="device in devices" :key="device.id" :device="device" />
        </div>
    </div>
</template>

<script>
// Import komponen DeviceList
import axios from 'axios';
import DeviceCard from '@/components/DeviceList.vue';

export default {
    components: {
        DeviceCard,
    },
    data() {
        return {
            devices: [], // Array untuk menyimpan data perangkat
        };
    },
    mounted() {
        // Ambil data perangkat dari API saat komponen dimuat
        this.fetchDevices();
    },
    methods: {
        async fetchDevices() {
            try {
                const response = await axios.get('http://iot-unipdu.test/api/perangkats');
                this.devices = response.data; // Simpan data perangkat ke dalam devices
            } catch (error) {
                console.error('Gagal mengambil data perangkat:', error);
            }
        },
    },
};
</script>

<style scoped>
.device-list {
    display: flex;
    flex-wrap: wrap;
}
</style>