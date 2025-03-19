<template>
  <div class="card shadow card-product">
    <div class="lamp-icon" :style="{ backgroundColor: isOn ? 'green' : 'red' }">
      <div class="watt-text">{{ watt }}W</div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ label }}</h5>
      <p class="card-text">Status Lampu: {{ isOn ? 'Nyala' : 'Mati' }}</p>

      <label class="switch">
        <input type="checkbox" v-model="isOn" @change="toggleLamp" />
        <span class="slider"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lampu',
  props: {
    label: String,
    watt: Number,
  },
  data() {
    return {
      isOn: false, // status lampu, mati secara default
    }
  },
  methods: {
    toggleLamp() {
      if (this.isOn) {
        this.$emit('updateWatt', this.watt) // Emit watt saat nyala
      } else {
        this.$emit('updateWatt', 0) // Emit watt 0 saat mati
      }
    },
  },
}
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
  background-color: red; /* Default mati */
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

input:checked + .slider {
  background-color: #2ecc71; /* Warna hijau saat nyala */
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
