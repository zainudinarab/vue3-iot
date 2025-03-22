<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="text-center mb-4">Login</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" v-model="email" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
            <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
            <div class="mt-3 text-center">
              <p>Belum punya akun? <router-link to="/register">Daftar</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/axios' // Mengimpor instance axios kamu

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      try {
        // Kirim request login ke API
        const response = await api.post('/login', {
          email: this.email,
          password: this.password,
        })

        // Ambil token dan user data dari respons
        const { token, user } = response.data

        // Simpan token dan data user (termasuk nama) ke localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        // Redirect ke halaman dashboard setelah login berhasil
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        // Menangani error jika login gagal
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'Login gagal. Coba lagi.'
        } else {
          this.errorMessage = 'Terjadi kesalahan. Coba lagi.'
        }
      }
    },
  },
}
</script>
