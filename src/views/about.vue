<script setup lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import { ref } from 'vue'

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
  axios.get('http://localhost:9000/user').then(res => {
    dataSource.value = res.data
  })
}

queryDataList()
</script>

<template>
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
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>

<style lang="scss" scoped></style>
