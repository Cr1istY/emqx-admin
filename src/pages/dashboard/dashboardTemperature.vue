<template>
    <body>
        <!-- 为每个节点创建独立的图表容器 -->
        <div id="chart" style="width: 800px; height: 500px;"></div>
    </body>
</template>

<script lang="ts"> 
import { defineComponent, onMounted } from 'vue';
import VChart from '@visactor/vchart';
import axios from '@/axios'



const formatDateTime = (timestamp: string) => {
    const data = new Date(timestamp)
    const year = data.getFullYear()
    const month = (data.getMonth() + 1).toString().padStart(2, '0')
    const day = data.getDate().toString().padStart(2, '0')
    const hour = data.getHours().toString().padStart(2, '0')
    const minute = data.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
}



export default defineComponent({
  name: 'DashboardTemperature',
  setup() {
    onMounted(async () => {
        try {
            const res = await axios.get('/empx/getMessage/3')
            const data = res.data
            console.log(data)
            const charData = data.map((item: any) => ({
                time: formatDateTime(item.ts),
                value: item.value
            }))
            console.log(charData)
            const spec = {
                type: 'line',
                data: {
                    values: charData
                },
                xField: 'time',
                yField: 'value'
            }

            const vchart = new VChart(spec, { dom: 'chart'})
            vchart.renderSync()
        } catch (error) {
            console.log(error)
        }
    });
  }
});
</script>