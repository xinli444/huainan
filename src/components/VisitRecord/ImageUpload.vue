<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { ElUpload, ElIcon, ElImage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const modelValue = useVModel(props, 'modelValue', emit)

const triggerRef = ref()

const fileList = ref([])

watch(
  modelValue,
  (url, oldUrl) => {
    if (typeof oldUrl === 'string' && /^blob:/.test(oldUrl)) {
      tryRevokeObjectURL(oldUrl)
    }
    fileList.value = url ? [{ url }] : []
  },
  { immediate: true }
)

function handleChange(uploadFile) {
  const url = URL.createObjectURL(uploadFile.raw)
  modelValue.value = url
}

function tryRevokeObjectURL(objectURL) {
  if (typeof objectURL === 'string' && /^blob:/.test(objectURL)) {
    URL.revokeObjectURL(objectURL)
  }
}

onBeforeUnmount(() => {
  tryRevokeObjectURL(modelValue.value)
})
</script>

<template>
  <div class="flex flex-col items-center">
    <el-image
      v-if="fileList.length"
      :src="fileList[0].url"
      class="w-[148px] h-[148px]"
      fit="scale-down"
    />
    <div v-else class="el-upload el-upload--picture-card" @click="triggerRef.click()">
      <el-icon><Plus /></el-icon>
    </div>
    <el-upload
      :file-list="fileList"
      :show-file-list="false"
      :auto-upload="false"
      accept=".jpg,.png"
      action="#"
      class="mt-[8px]"
      :on-change="handleChange"
    >
      <div ref="triggerRef">
        <slot></slot>
      </div>
    </el-upload>
  </div>
</template>
