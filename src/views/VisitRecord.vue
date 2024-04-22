<script setup>
import { ref, shallowRef, watch } from 'vue'
import {
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
  vLoading
} from 'element-plus'
import { saveAs } from 'file-saver'
import ImageUpload from '@/components/VisitRecord/ImageUpload.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import bgVisitRecord from '@/assets/images/bg-visit-record.png'

const fabric = window.fabric

const peopleImageUrl = ref()
const sceneImgUrl = ref()

const canvasElRef = ref()
const canvasRef = shallowRef()
const peopleImgRef = shallowRef()
const sceneImgRef = shallowRef()

const filterValue = ref('0')
// const filterList = ref([
//   { label: '原图', value: '0' },
//   { label: '灰度', value: '1' },
//   { label: '底片', value: '2' },
//   { label: '黑白', value: '3' },
//   { label: '怀旧', value: '4' },
//   { label: '模糊', value: '5' },
//   { label: '老照片', value: '6' },
//   { label: '混合', value: '7' },
//   { label: '调和', value: '8' },
//   { label: '棕仙', value: '9' },
//   { label: '彩色胶片', value: '10' },
//   { label: '马赛克', value: '11' },
//   { label: '宝丽来', value: '12' },
//   { label: '彩色', value: '13' }
// ])

const isDrawingMode = ref(false)

const dataUrl = ref('')
const isLoading = ref(false)

const prompt = ref('')

watch(canvasElRef, () => {
  canvasRef.value = new fabric.Canvas(canvasElRef.value)
  // peopleImageUrl.value = '/people.png'
  // sceneImgUrl.value = '/scene.jpg'
  canvasRef.value.freeDrawingBrush = new fabric.EraserBrush(canvasRef.value)
  canvasRef.value.freeDrawingBrush.width = 10
})

watch(peopleImageUrl, () => {
  isDrawingMode.value = false

  peopleImgRef.value && canvasRef.value?.remove(peopleImgRef.value)

  canvasRef.value.remove()
  fabric.Image.fromURL(peopleImageUrl.value, function (img) {
    img.scale(0.5).set({
      left: 100,
      top: 100
    })
    setImgFilters(img)
    peopleImgRef.value = img
    canvasRef.value?.insertAt(img, 1)
  })
})

watch(sceneImgUrl, () => {
  isDrawingMode.value = false

  sceneImgRef.value && canvasRef.value?.remove(sceneImgRef.value)

  fabric.Image.fromURL(sceneImgUrl.value, function (img) {
    img.scale(0.5).set({
      left: 0,
      top: 0
    })
    setImgFilters(img)
    img.set('selectable', false)
    img.set('erasable', false)
    sceneImgRef.value = img
    canvasRef.value?.insertAt(img, 0)
  })
})

watch(filterValue, () => {
  setImgFilters(peopleImgRef.value)
  setImgFilters(sceneImgRef.value)
  canvasRef.value.renderAndResetBound()
})

watch(isDrawingMode, () => {
  canvasRef.value.isDrawingMode = isDrawingMode.value
})

function setImgFilters(image) {
  image.filters = []
  switch (filterValue.value) {
    case '0':
      break //原图
    case '1':
      image.filters.push(new fabric.Image.filters.Grayscale()) //灰度
      break
    case '2':
      image.filters.push(new fabric.Image.filters.Invert()) //底片
      break
    case '3':
      image.filters.push(new fabric.Image.filters.BlackWhite()) // 纯黑白
      break
    case '4':
      image.filters.push(new fabric.Image.filters.Sepia()) // 復古 怀旧
      break
    case '5':
      image.filters.push(
        new fabric.Image.filters.Blur({
          blur: 0.5
        })
      ) // 模糊
      break
    case '6':
      image.filters.push(new fabric.Image.filters.Vintage()) //老照片
      break
    case '7':
      image.filters.push(new fabric.Image.filters.BlackWhite()) // 纯黑白
      image.filters.push(new fabric.Image.filters.Sepia()) // 復古   混合
      break
    case '8':
      image.filters.push(new fabric.Image.filters.BlendColor()) //盲目的
      break
    case '9':
      image.filters.push(new fabric.Image.filters.Brownie()) //棕仙
      break
    case '10':
      image.filters.push(new fabric.Image.filters.Kodachrome()) //彩色胶片
      break
    case '11':
      image.filters.push(new fabric.Image.filters.Pixelate()) //马赛克
      break
    case '12':
      image.filters.push(new fabric.Image.filters.Polaroid()) //宝丽来
      break
    case '13':
      image.filters.push(new fabric.Image.filters.Technicolor()) //彩色
      break
  }
  image.applyFilters()
}

function erase() {
  if (!sceneImgUrl.value) {
    return
  }
  canvasRef.value.freeDrawingBrush.inverted = false
  isDrawingMode.value = true
}

function undoErase() {
  if (!sceneImgUrl.value) {
    return
  }
  canvasRef.value.freeDrawingBrush.inverted = true
  isDrawingMode.value = true
}

function completeErase() {
  if (!sceneImgUrl.value) {
    return
  }
  isDrawingMode.value = false
}

async function handleCommand(command) {
  prompt.value = command
  await exportPicture()
}

async function exportPicture() {
  dataUrl.value = canvasRef.value.toDataURL()

  isLoading.value = true
  const formData = new FormData()
  formData.append('projectID', 's1')
  formData.append('img', dataUrl.value.substring(22))
  formData.append('prompt', prompt.value)
  try {
    const res = await fetch('/api/stream_predict', {
      method: 'post',
      headers: {
        // 'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
    const json = await res.json()
    saveAs(`data:image/jpg;base64,${json.img}`, `${new Date().getTime()}.jpg`)
  } catch (error) {
    console.error(error)
  }
  isLoading.value = false
}
</script>

<template>
  <main
    v-loading="isLoading"
    element-loading-text="处理中"
    class="h-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${bgVisitRecord})` }"
  >
    <div class="flex justify-center items-center space-x-[84px]">
      <div class="space-y-[56px]">
        <ImageUpload v-model="peopleImageUrl">
          <img src="@/assets/images/icon-upload-people.png" alt="" class="w-[80px] h-[80px]" />
          <span class="text-[16px] text-[#C0DEEF] leading-[24px] mt-[16px]">上传人像</span>
        </ImageUpload>
        <ImageUpload v-model="sceneImgUrl">
          <img src="@/assets/images/icon-upload-scene.png" alt="" class="w-[80px] h-[80px]" />
          <span class="text-[16px] text-[#C0DEEF] leading-[24px] mt-[16px]">选择风景</span>
        </ImageUpload>
        <div class="space-y-[16px]">
          <el-button type="primary" size="large" class="w-full" @click="erase">擦除</el-button>
          <div class="flex">
            <el-button type="primary" plain size="large" class="w-1/2" @click="undoErase"
              >取消擦除</el-button
            >
            <el-button type="primary" plain size="large" class="w-1/2" @click="completeErase"
              >完成擦除</el-button
            >
          </div>
          <el-dropdown
            type="primary"
            class="w-full export-dropdown"
            @command="handleCommand"
            @click="exportPicture"
          >
            <el-button type="primary">
              导出照片<el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="潇洒的男人">潇洒的男人</el-dropdown-item>
                <el-dropdown-item command="美丽的女人">美丽的女人</el-dropdown-item>
                <el-dropdown-item command="战争风云">战争风云</el-dropdown-item>
                <el-dropdown-item command="风和日丽">风和日丽</el-dropdown-item>
                <el-dropdown-item command="静谧温馨">静谧温馨</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="bg-white rounded-[8px] border-[1px] border-solid border-[#81BDDE]">
        <canvas ref="canvasElRef" width="960" height="540"></canvas>
        <!-- <div class="mt-[8px]">
          <el-radio-group v-model="filterValue">
            <template v-for="{ label, value } in filterList" :key="value">
              <el-radio :label="label" :value="value" />
            </template>
          </el-radio-group>
        </div> -->
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.export-dropdown {
  :deep(.el-button-group) {
    display: inline-flex;
    width: 100%;
  }
  :deep(.el-button):first-child {
    flex: auto;
  }
}
</style>
