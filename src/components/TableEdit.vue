<!-- eslint-disable no-debugger -->
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

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
  onFinish()
}

let modalFormState = reactive({
  data: {
    id: undefined,
    name: '',
    age: undefined,
    address: ''
  }
})

watch(
  () => props.formState,
  newVal => {
    modalFormState.data = newVal
  }
)

const formRef = ref<FormInstance>()
const onFinish = async () => {
  const values = await formRef.value?.validateFields()
  emit('onOk', { ...modalFormState.data, ...values })
}

let checkAge = async (_rule: Rule, value: number) => {
  if (!value) {
    return Promise.reject('Please input the age')
  }
  if (!Number.isInteger(value)) {
    return Promise.reject('Please input digits')
  } else {
    if (value < 18) {
      return Promise.reject('Age must be greater than 18')
    } else {
      return Promise.resolve()
    }
  }
}
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
      ref="formRef"
      :model="modalFormState.data"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="onFinish"
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
        :rules="[{ required: true, validator: checkAge, trigger: 'change' }]"
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
