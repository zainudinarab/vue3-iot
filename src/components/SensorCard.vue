<template>
    <div class="card shadow card-product">
        <div class="card-body">
            <h5 class="card-title">{{ device.nama }}</h5>
            <p class="card-text">Status: {{ device.status }} (Sensor Arus)</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SensorCard',
    props: {
        device: Object,
    },
};
</script>