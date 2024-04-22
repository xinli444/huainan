<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { ElUpload, ElImage } from 'element-plus'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const modelValue = useVModel(props, 'modelValue', emit)

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
    <el-upload
      :file-list="fileList"
      :show-file-list="false"
      :auto-upload="false"
      accept=".jpg,.png"
      action="#"
      class="mt-[8px]"
      :on-change="handleChange"
    >
      <el-image
        v-if="fileList.length"
        :src="fileList[0].url"
        class="w-[288px] h-[162px]"
        fit="scale-down bg-white"
      />
      <div
        v-else
        class="w-[288px] h-[162px] flex flex-col items-center justify-center border-[#81BDDE] border-[1px] border-solid rounded-[6px] bg-white"
      >
        <slot></slot>
      </div>
    </el-upload>
  </div>
</template>
