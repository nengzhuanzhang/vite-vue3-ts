<!-- eslint-disable no-debugger -->
<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  formState: {
    type: Object
  },
  title: {
    type: String
  }
})

const modalVisible = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val)
})

const emit = defineEmits([`update:visible`, 'update:formState', 'onClosed', 'onOk'])
const onClose = () => {
  emit('onClosed')
}

const onOk = () => {
  emit('onOk', modalFormState.data)
}

let modalFormState = reactive({
  data: {
    id: undefined,
    name: '',
    age: 0,
    address: ''
  }
})

watch(
  () => props.formState,
  newVal => {
    modalFormState.data = newVal
  }
)
</script>

<template>
  <a-modal
    v-model:visible="modalVisible"
    :title="title"
    ok-text="confirm"
    cancel-text="cancel"
    @ok="onOk"
    @cancel="onClose"
  >
    <a-form
      :model="modalFormState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input your name!' }]"
      >
        <a-input v-model:value="modalFormState.data.name" />
      </a-form-item>

      <a-form-item
        label="Age"
        name="age"
        :rules="[{ required: true, message: 'Please input your age!' }]"
      >
        <a-input-number v-model:value="modalFormState.data.age" />
      </a-form-item>
      <a-form-item label="Address" name="address">
        <a-input v-model:value="modalFormState.data.address" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="scss" scoped></style>
