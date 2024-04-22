<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="fixed top-0 left-0 right-0 h-[100px] px-[50px] flex items-center justify-end z-50">
    <nav class="flex items-center space-x-[26px]">
      <RouterLink to="/#city-culture" class="nav-link flex items-center space-x-[26px]">
        <img src="@/assets/images/icon-city-culture.png" alt="" class="w-[45px] h-[45px]" />
        <span>城市文化</span>
      </RouterLink>
      <RouterLink to="/#heritage-appreciation" class="nav-link flex items-center space-x-[26px]">
        <img
          src="@/assets/images/icon-heritage-appreciation.png"
          alt=""
          class="w-[45px] h-[45px]"
        />
        <span>非遗欣赏</span>
      </RouterLink>
      <RouterLink to="/visit-record" class="nav-link flex items-center space-x-[26px]">
        <img src="@/assets/images/icon-visit-record.png" alt="" class="w-[45px] h-[45px]" />
        <span>参观纪念</span>
      </RouterLink>
    </nav>
  </header>

  <div class="absolute top-0 left-0 h-screen w-screen">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.nav-link {
  font-size: 24px;
  font-weight: 500;
  line-height: 33px;
  color: #333;

  &:is(.router-link-active) {
    color: #a77a06;
    background: linear-gradient(
      180deg,
      rgba(211, 178, 14, 0.0044) 0%,
      rgba(211, 178, 14, 0.44) 100%
    );
  }
}
</style>
