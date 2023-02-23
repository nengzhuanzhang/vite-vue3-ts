<!-- eslint-disable no-debugger -->
<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { ref, getCurrentInstance, computed } from 'vue'
import router from '../router/index'
// const { ctx } = getCurrentInstance()

const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)

let menuList: any = []
const getRouter = () => {
  menuList = router.options.routes
}
getRouter()

const LeftMenu = computed(() => {
  let LeftMenuArr: any = []
  menuList.forEach((ele: any) => {
    if (ele?.leftMenu) {
      LeftMenuArr.push(ele)
    }
  })
  return LeftMenuArr
})
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in LeftMenu" :key="item.path">
          <component :is="$antIcons[item.meta.icon]" />
          <span class="menu-text">
            <router-link :to="item.path">{{ item.meta.title }}</router-link>
          </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  .menu-text a {
    color: #fff;
  }
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
