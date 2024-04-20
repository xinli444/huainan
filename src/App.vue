<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav class="space-x-[20px]">
        <RouterLink to="/#city-culture">城市文化</RouterLink>
        <RouterLink to="/#heritage-appreciation">非遗欣赏</RouterLink>
        <RouterLink to="/visit-record">参观记录</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
