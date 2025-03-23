<template>
  <div class="card shadow card-product">
    <div class="card-header">
      <h5>Kelas {{ kelas.name }}</h5>
    </div>
    <div class="card-body">
      <!-- Bagian Kiri untuk Perangkat Relay -->
      <div class="device-column">
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
      <div class="device-column">
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
}
</script>

<style scoped>
.card {
  margin-bottom: 15px; /* Menambahkan margin bawah di luar card */
}

.card-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Default 2 kolom untuk layar kecil */
  gap: 20px;
  padding: 10px; /* Tambahkan padding untuk memberi ruang antara card dan konten */
  justify-items: center; /* Menjaga agar kolom terpusat secara horizontal */
  align-items: start; /* Membuat konten dalam card lebih rata di bagian atas */
}

.device-column {
  display: grid;
  gap: 1px;
  margin-bottom: 5px; /* Memberi jarak antar perangkat */
  justify-items: center; /* Menjaga agar perangkat dalam kolom terpusat secara horizontal */
}

.device-item {
  text-align: center;
  margin-bottom: 10px; /* Memberi jarak di bawah setiap perangkat */
}

.device-label {
  display: block;
  margin-bottom: 8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px; /* Ukuran lebar switch lebih konsisten */
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
  margin-bottom: 10px; /* Memberi jarak antar sensor */
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
  font-family: 'Courier New', Courier, monospace;
}

/* Responsif untuk Layar Lebar - 6 Kolom */
/* Responsif untuk Layar Kecil (Menampilkan 1 kolom di bawah 576px) */
@media (max-width: 575px) {
  .card-body {
    grid-template-columns: 1fr; /* Menampilkan 1 kolom */
  }
}

/* Responsif untuk Layar Lebar - 3 Kolom untuk tablet (di antara 576px dan 768px) */
@media (min-width: 576px) and (max-width: 768px) {
  .card-body {
    grid-template-columns: repeat(3, 1fr); /* Menampilkan 3 kolom */
  }
}

/* Responsif untuk Layar Lebar - 6 Kolom untuk layar besar */
@media (min-width: 768px) {
  .card-body {
    grid-template-columns: repeat(6, 1fr); /* Menampilkan 6 kolom per baris */
  }
}
</style>
