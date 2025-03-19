<template>
  <div class="card shadow card-product">
    <div class="lamp-icon" :style="{ backgroundColor: device.isOn ? 'green' : 'red' }">
      <div class="watt-text">{{ device.watt }}W</div>
    </div>
    <div class="card-body">
      <h5 class="card-title text-center">{{ device.name }}</h5>
      <div class="d-flex justify-content-center">
        <label class="switch">
          <input type="checkbox" :checked="device.isOn" @change="toggleDevice" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['device'],
  methods: {
    toggleDevice() {
      this.device.isOn = !this.device.isOn
    },
  },
}
</script>

<style scoped>
.lamp-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto 10px auto; /* Menambahkan margin-top agar ada jarak dari atas */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 0.3s ease;
}

.watt-text {
  color: white;
  font-weight: bold;
  font-size: 18px;
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

input:checked + .slider {
  background-color: #2ecc71; /* Warna hijau saat nyala */
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
