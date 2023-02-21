<!-- eslint-disable no-debugger -->
<script setup lang="ts">
import {
  SmileOutlined,
  DownOutlined,
  PlusOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import axios from 'axios'
import { createVNode, reactive, ref } from 'vue'
import tableEdit from '../components/TableEdit.vue'
import { message, Modal } from 'ant-design-vue'

const httpUrl = import.meta.env.VITE_HTTP

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Action',
    key: 'action'
  }
]

const dataSource = ref()
const queryDataList = () => {
  axios.get(`${httpUrl}/user`).then(res => {
    dataSource.value = res.data
  })
}
queryDataList()

const visible = ref<boolean>(false)
const onAdd = () => {
  visible.value = true
}

const onClosed = () => {
  visible.value = false
}

// 新增、编辑
const onOk = formState => {
  if (formState.id) {
    axios.put(`${httpUrl}/user/edit`, { ...formState }).then(res => {
      if (res.data.status === 200) {
        message.info('edit success!')
        onClosed()
        queryDataList()
      } else {
        message.info('edit fail!')
      }
    })
  } else {
    axios.post(`${httpUrl}/user/add`, { ...formState }).then(res => {
      if (res.data.status === 200) {
        message.info('add success!')
        onClosed()
        queryDataList()
      } else {
        message.info('add fail!')
      }
    })
  }
}

// 删除
const onDelete = (id: number) => {
  Modal.confirm({
    title: 'Tip',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Delete confirm?',
    okText: 'Confirm',
    cancelText: 'Cancel',
    onOk: () => {
      axios.delete(`${httpUrl}/user/add/user/delete/${id}`).then(res => {
        if (res.data.status === 200) {
          message.info('delete success!')
          queryDataList()
        } else {
          message.info('delete fail!')
        }
      })
    }
  })
}

// 编辑
let formState = reactive({
  id: undefined,
  name: '',
  age: 0,
  address: ''
})
const onEdit = (record: { id: undefined | any; name: string; age: number; address: string }) => {
  visible.value = true
  formState = { ...record }
}
</script>

<template>
  <a-row justify="end">
    <a-col :span="2">
      <a-button type="primary" @click="onAdd">
        <template #icon><PlusOutlined /></template>
        Add
      </a-button>
    </a-col>
  </a-row>

  <a-table :dataSource="dataSource" :columns="columns">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="onEdit(record)">Edit</a>
          <a-divider type="vertical" />
          <a @click="onDelete(record.id)">Delete</a>
          <!-- <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a> -->
        </span>
      </template>
    </template>
  </a-table>

  <!-- 新增编辑 弹框 -->
  <table-edit
    :visible="visible"
    :formState="formState"
    :title="'Add'"
    @onClosed="onClosed"
    @onOk="onOk"
  ></table-edit>
</template>

<style lang="scss" scoped></style>
