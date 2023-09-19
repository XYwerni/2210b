<template>
  <div>
    <el-input v-model="search" placeholder="请输入内容" class="input-with-select">
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <el-button type="primary">添加商品</el-button>
    <el-table :data="goods" style="width: 100%">
      <el-table-column type="index" label="#" />
      <el-table-column prop="goods_name" label="商品名称" />
      <el-table-column prop="goods_price" label="商品价格（元）" />
      <el-table-column prop="goods_weight" label="商品重量" />
      <el-table-column prop="add_time" label="创建时间" />
      <el-table-column>
        <template #default="scope">
          <el-button type="primary" :icon="Edit"></el-button>
          <el-button type="error" :icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { categoriesApi } from "../utils/api";
import { ElMessage } from "element-plus";
import { Search, Delete, Edit } from "@element-plus/icons-vue";

const search = ref("");
const goods = ref([]);
const pageInfo = reactive({
  query: "",
  pagenum: 1,
  pagesize: 5
});
const total = ref("");
categoriesApi(pageInfo).then(res => {
  console.log(res, "商品");
  //   ElMessage.success(res.data.meta.msg);
  total.value = res.data.data.total;
  goods.value = res.data.data.goods;
});

const creatTime = computed(() => () => {});
</script>