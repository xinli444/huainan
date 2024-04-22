<template>
  <div id="heritage-appreciation" class="w-full h-full bg-[url('/home-page-3.png')] bg-cover bg-no-repeat pt-[100px] pb-[113px]">
    <div class="mb-[88px] flex justify-center">
      <img src="/huainan.png" class="w-[78px] h-[167px] " alt="">
    </div>
    <div class="flex space-x-[32px] items-center justify-center">
      <div v-for="(item, index) in list" :key="item.title" class="w-[500px]">
        <RouterLink :to="item.link">
          <img :src="`/home-page-3${index+1}.png`" class="w-[500px] h-[500px] mb-[40px]" alt="">
          <div class="text-center">
            <div class="inline-block w-[240px] h-[72px] border-[2px] border-[solid] border-[#dddddd] rounded-[8px] text-[32px] text-[#dddddd] tracking-[3px] text-center leading-[68px]">
              详情
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
    <!-- <RouterLink to="/heritage-appreciation/traditional-skill">传统技艺</RouterLink>
    <RouterLink to="/heritage-appreciation/traditional-dance">传统舞蹈</RouterLink> -->
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
const list = [
  {
    title:'传统曲艺',
    link:'/heritage-appreciation/traditional-quyi'
  },
  {
    title:'传统技艺',
    link:'/heritage-appreciation/traditional-skill'
  },
  {
    title:'传统舞蹈',
    link:'/heritage-appreciation/traditional-dance'
  },
]
</script>
<style scoped>
</style>
