<script setup lang="ts"></script>

<template>
  <div>
    <router-link to="/">home</router-link> |
    <router-link to="/about">about</router-link>
    <a-divider />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
