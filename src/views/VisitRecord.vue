<script setup>
import { ref, shallowRef, watch } from 'vue'
import { ElButton, ElRadioGroup, ElRadio } from 'element-plus'
import { saveAs } from 'file-saver'
import ImageUpload from '@/components/VisitRecord/ImageUpload.vue'

const fabric = window.fabric

const peopleImageUrl = ref()
const sceneImgUrl = ref()

const canvasElRef = ref()
const canvasRef = shallowRef()
const peopleImgRef = shallowRef()
const sceneImgRef = shallowRef()

const filterValue = ref('0')
const filterList = ref([
  { label: '原图', value: '0' },
  { label: '灰度', value: '1' },
  { label: '底片', value: '2' },
  { label: '黑白', value: '3' },
  { label: '怀旧', value: '4' },
  { label: '模糊', value: '5' },
  { label: '老照片', value: '6' },
  { label: '混合', value: '7' },
  { label: '调和', value: '8' },
  { label: '棕仙', value: '9' },
  { label: '彩色胶片', value: '10' },
  { label: '马赛克', value: '11' },
  { label: '宝丽来', value: '12' },
  { label: '彩色', value: '13' }
])

const isDrawingMode = ref(false)

watch(canvasElRef, () => {
  canvasRef.value = new fabric.Canvas(canvasElRef.value)
  peopleImageUrl.value = '/people.png'
  sceneImgUrl.value = '/scene.jpg'
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
  canvasRef.value.freeDrawingBrush.inverted = false
  isDrawingMode.value = true
}

function undoErase() {
  canvasRef.value.freeDrawingBrush.inverted = true
  isDrawingMode.value = true
}

function completeErase() {
  isDrawingMode.value = false
}

function exportPicture() {
  const dataUrl = canvasRef.value.toDataURL()
  saveAs(dataUrl, `${new Date().getTime()}.png`)
}
</script>

<template>
  <main>
    <div class="flex justify-center items-center space-x-[16px]">
      <div>
        <ImageUpload v-model="peopleImageUrl">
          <el-button type="primary">
            <span>上传人像</span>
          </el-button>
        </ImageUpload>
        <ImageUpload v-model="sceneImgUrl">
          <el-button type="primary">
            <span>选择风景</span>
          </el-button>
        </ImageUpload>
      </div>
      <div>
        <canvas ref="canvasElRef" width="960" height="540"></canvas>
        <div class="mt-[8px]">
          <el-radio-group v-model="filterValue">
            <template v-for="{ label, value } in filterList" :key="value">
              <el-radio :label="label" :value="value" />
            </template>
          </el-radio-group>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <el-button type="primary" @click="erase">擦除</el-button>
            <el-button type="primary" @click="undoErase">取消擦除</el-button>
            <el-button v-if="isDrawingMode" type="primary" @click="completeErase"
              >完成擦除</el-button
            >
          </div>
          <el-button type="primary" @click="exportPicture">导出照片</el-button>
        </div>
      </div>
    </div>
  </main>
</template>
