<template>
  <div class="about">
    <el-container>
      <el-header class="header">
        <div>公司logo</div>
        <div>企业后台管理系统</div>
        <div>
          <el-button type="info" @click="logout">登出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: #4a5064;height:100%">
          <el-icon style="background-color: #4a5064;">
            <Histogram />
          </el-icon>
          <el-menu
            router
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="route.path"
            text-color="#fff"
          >
            <el-sub-menu v-for="item in menus" :key="item.id" :index="item.path">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="item1 in item.children"
                  :key="item1.id"
                  :index="`/about/${item1.path}`"
                >{{ item1.authName }}</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { rightsApi } from "../utils/api";
import { Histogram } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();
const route = useRoute();

interface children {
  authName: string;
  id: number;
  path: string;
  children: children[];
}
interface menu {
  authName: string;
  id: number;
  path: string;
}
const menus = ref<menu[]>([]);
rightsApi().then(res => {
  console.log(res, "权限列表");
  menus.value = res.data.data;
  ElMessage.success(res.data.meta.msg);
});

const logout = () => {
  localStorage.removeItem("token");
  router.push("/");
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #333744;
}
</style>
