<template>
  <div class="container mt-5">
    <h2>Dashboard</h2>
    <div v-if="user">
      <p>Selamat datang, {{ user.name }}!</p>
      <!-- Menampilkan nama pengguna -->
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Anda belum login.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },
  created() {
    // Ambil data pengguna dari localStorage
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.user = user
    } else {
      this.$router.push({ name: 'login' }) // Redirect ke login jika tidak ada data user
    }
  },
}
</script>
