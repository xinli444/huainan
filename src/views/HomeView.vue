<script setup>
import CityCulture from "@/components/HomeView/CityCulture.vue"
import HeritageAppreciation from "@/components/HomeView/HeritageAppreciation.vue"
</script>

<template>
  <main class="h-full">
    <div class="w-full h-full bg-[url('/home-page.png')] bg-cover bg-no-repeat pt-[184px] pl-[220px]">
      <div >
        <img src="/title.png" class="w-[1534px] h-[225px] " alt="">
      </div>
    </div>
    <CityCulture />
    <HeritageAppreciation />
  </main>
</template>
