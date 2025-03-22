<template>
    <div class="card shadow card-product">
      <div class="card-header">
        <h5>Kelas {{ kelas.nomor }}</h5>
      </div>
      <div class="card-body d-flex">
        <!-- Bagian Kiri untuk Perangkat Relay -->
        <div class="w-50 p-3">
          <div v-for="(perangkat, key) in kelas.perangkat_relay" :key="perangkat.id">
            <div class="device-item">
              <label class="device-label">{{ perangkat.nama }}</label>
              <label class="switch">
                <input
                  type="checkbox"
                  :checked="perangkat.status"
                  @change="$emit('toggle-perangkat', perangkat)"
                  :disabled="!perangkat.topic_mqtt"
                />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
  
        <!-- Bagian Kanan untuk Perangkat Sensor -->
        <div class="w-50 p-3">
          <div v-for="(perangkat, key) in kelas.perangkat_sensor" :key="key">
            <div class="device-item">
              <label class="device-label">{{ perangkat.nama }}</label>
              <div class="sensor-item">
                <div class="digital-frame">
                  <span class="status-text">{{ perangkat.status }} A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      kelas: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 15px;
  }
  
  .card-body {
    display: flex;
  }
  
  .w-50 {
    width: 50%;
  }
  
  .p-3 {
    padding: 15px;
  }
  
  .device-item {
    margin-bottom: 10px;
    text-align: center;
  }
  
  .device-label {
    display: block;
    margin-bottom: 8px;
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
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #2ecc71;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  input:disabled + .slider {
    background-color: #e0e0e0;
  }
  
  input:disabled + .slider:before {
    background-color: #b0b0b0;
  }
  
  .sensor-item {
    text-align: center;
  }
  
  .digital-frame {
    display: inline-block;
    width: 100%;
    padding: 0px;
    border: 2px solid #000;
    border-radius: 8px;
    background-color: #1e1e1e;
    text-align: center;
  }
  
  .status-text {
    font-size: 1.7rem;
    font-weight: bold;
    color: #00ff00;
    font-family: "Courier New", Courier, monospace;
  }
  </style>
  