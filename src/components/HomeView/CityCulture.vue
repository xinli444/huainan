

<template>
  <div id="city-culture" class="w-full h-full pt-[97px] pb-[143px]">
    <div class="mb-[89px] flex justify-center">
      <img src="/home-page-2-top.png" class="w-[509px] h-[122px] " alt="">
    </div>
    <el-carousel :interval="4000" type="card" height="629px">
      <el-carousel-item v-for="item in list" :key="item.title" >
        <div class="relative w-[722px]">
          <img :src="item.src" class="w-[722px] h-[478px]" alt="">
          <div class="absolute bottom-0 bg-[rgba(0,0,0,0.50)] text-white text-[24px] leading-[31px] pt-[20px] text-center w-full">
            {{ item.title }}
          </div>
        </div>
        <div class="w-[722px] px-[10px] py-[20px] text-[#666666] text-[16px] tracking-[1px] leading-[26px]">
          {{ item.desc }}
        </div>
      </el-carousel-item>
  </el-carousel>
  </div>
</template>
<script setup>
import { ElCarousel } from 'element-plus'
const list = [
  {
    title:'历史文化',
    src: '/home-page-21.png',
    desc:'淮南历史悠久，文化底蕴深厚，西汉时刘邦封英布为淮南王，首置淮南国，后刘安在八公山招贤纳士，著书立说，编纂了千古名篇，被称为中国古代百科全书的《淮南子》，发明了华夏美食豆腐。'
  },
  {
    title:'城市地位',
    src: '/home-page-22.png',
    desc:'淮南是中国能源之都、华东工业粮仓、安徽省重要的工业城市、国务院1984年13个较大城市之一，获得中国优秀旅游城市、全国百个宜居城市、全国绿化模范城市、国家园林城市、国家首批试点智慧城市、中国最佳投资城市、中国最具幸福感城市等荣誉。'
  },
  {
    title:'地理位置',
    src: '/home-page-23.png',
    desc:'古称州来、寿春、下蔡，安徽省辖地级市，Ⅱ型大城市，长江三角洲腹地，淮河之滨，东与滁州市毗邻，东南与合肥市接壤，西南与六安市相连，西与阜阳市相接，北与亳州市、蚌埠市交界，素有“中州咽喉，江南屏障”、“五彩淮南”之称，是沿淮城市群的重要节点，合肥经济圈成员之一.'
  },
]
</script>
<style scoped>
#city-culture{
  background: linear-gradient( 180deg, rgba(45,115,154,0.3) 0%, rgba(89,171,202,0) 100%);
}
</style>

