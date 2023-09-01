<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import HistoryTable from "./components/HistoryTable.vue";

defineOptions({
  name: "Welcome"
});

const { height } = useWindowSize();
const { version } = __APP_INFO__.pkg;
</script>

<template>
  <div>
    <el-row :gutter="24">
      <el-col
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card
          shadow="never"
          :style="{ height: `calc(${height}px - 35vh - 250px)` }"
        >
          <template #header>
            <div class="flex justify-between items-center">
              <span>用户登录历史日志</span>
              <span class="text-gray-400 text-sm">v{{ version }}</span>
            </div>
          </template>
          <template #default>
            <el-scrollbar :height="`calc(${height}px - 35vh - 340px)`">
              <HistoryTable />
            </el-scrollbar>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
