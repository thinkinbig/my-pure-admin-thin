<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { getUserLoginHistory, LoginHistoryResult } from "@/api/user";

defineOptions({
  name: "HistoryTable"
});

interface HistoryData {
  id: number;
  login_time: string;
  username: string;
}

const historyData = ref<HistoryData[]>([]);

const search = ref<string>("");

const filteredData = computed(() => {
  return historyData.value.filter(item => {
    return item.login_time.includes(search.value);
  });
});

onMounted(() => {
  getUserLoginHistory()
    .then((res: LoginHistoryResult) => {
      historyData.value = res.data;
    })
    .finally(() => {
      loading.value = false;
    });
});

const loading = ref<boolean>(true);
</script>

<template>
  <el-skeleton animated :rows="7" :loading="loading">
    <el-table :data="filteredData" class="table" border>
      <el-table-column prop="id" label="登录序号" />
      <el-table-column prop="login_time">
        <template #header>
          <span>登录时间</span>
          <el-input v-model="search" placeholder="点击搜索登录时间" clearable />
        </template>
        <template #default="{ row }">
          <span>{{ row.login_time }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
    </el-table>
  </el-skeleton>
</template>

<style lang="scss" scoped>
.main {
  padding: 0 20px;
}

.table {
  width: 100%;
}
</style>
