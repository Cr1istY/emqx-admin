<template>
  <div class="flex flex-col items-center p-4">
    <!-- 日期选择器 -->
    <div class="flex justify-center mb-4">
      <el-date-picker 
        v-model="startTime" 
        type="datetime" 
        placeholder="开始时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        class="w-48"
      />
      <div class="mx-4"></div>
      <el-date-picker 
        v-model="endTime" 
        type="datetime" 
        placeholder="结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        class="w-48"
      />
      <el-button @click="handleSearch" type="primary" class="ml-4">
        查询
      </el-button>
    </div>
    
    <!-- 图表容器 -->
    <div id="chart" class="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 h-[50vh] min-h-[300px]"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import VChart from '@visactor/vchart';
import axios from '@/axios';

interface NodeData {
  nodeID: number;
  ts: string;
  value: number;
}

interface ChartData {
  id: number;
  time: string;
  value: number;
}

export default defineComponent({
  name: 'DashboardTemperature',
  setup() {
    // 响应式数据
    const startTime = ref<string>('');
    const endTime = ref<string>('');
    const chartData = ref<ChartData[]>([]);
    let vchart: VChart | null = null;

    // 格式化时间戳
    const formatDateTime = (timestamp: string): string => {
      const data = new Date(timestamp);
      const year = data.getFullYear();
      const month = (data.getMonth() + 1).toString().padStart(2, '0');
      const day = data.getDate().toString().padStart(2, '0');
      const hour = data.getHours().toString().padStart(2, '0');
      const minute = data.getMinutes().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hour}:${minute}`;
    };

    // 处理原始数据
    const processData = (data: NodeData[]): ChartData[] => {
      return data.map((item: NodeData) => ({
        id: item.nodeID,
        time: formatDateTime(item.ts.slice(0, -1) + '+08:00'),
        value: item.value,
      }));
    };

    // 初始化图表
    const initChart = (data: ChartData[]) => {
      // 释放旧图表实例
      if (vchart) {
        vchart.release();
      }
      
      const spec = {
        type: 'line',
        data: {
          values: data,
        },
        xField: 'time',
        yField: 'value',
        seriesField: 'id',
        invalidType: 'link',
      };

      vchart = new VChart(spec, { dom: 'chart' });
      vchart.renderSync();
    };

    // 加载数据（带日期过滤）
    const loadData = async () => {
      try {
        // 构建查询参数
        const params: Record<string, string> = {};
        if (startTime.value) {
          params.startTime = startTime.value;
        }
        if (endTime.value) {
          params.endTime = endTime.value;
        }

        const res = await axios.get('/empx/getMessage/8', { params });
        const processedData = processData(res.data);
        chartData.value = processedData;
        
        initChart(processedData);
      } catch (error) {
        console.error('数据加载失败:', error);
      }
    };

    // 手动触发查询
    const handleSearch = () => {
      if (!startTime.value || !endTime.value) {
        console.warn('请选择完整的时间范围');
        return;
      }
      loadData();
    };

    // 自动监听日期变化（可选）
    watch([startTime, endTime], ([newStart, newEnd]) => {
      if (newStart && newEnd) {
        // 如果需要选择后立即更新，取消下面这行的注释
        // loadData();
      }
    });

    // 组件挂载时加载初始数据
    onMounted(() => {
      loadData();
    });

    // 暴露给模板
    return {
      startTime,
      endTime,
      handleSearch,
    };
  },
});
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>