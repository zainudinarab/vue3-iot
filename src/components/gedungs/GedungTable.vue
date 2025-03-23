<template>
    <div class="container mt-4">
      <h2 class="mb-3">Daftar Gedung</h2>
      <button class="btn btn-primary mb-3" @click="$emit('add')">Tambah Gedung</button>
      <table class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nama Gedung</th>
            <th>Jumlah Lantai</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gedung in gedungs" :key="gedung.id">
            <td>{{ gedung.id }}</td>
            <td>{{ gedung.nama }}</td>
            <td>{{ gedung.jumlah_lantai }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="$emit('edit', gedung)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="$emit('delete', gedung.id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  defineProps(['gedungs']);
  </script>
  