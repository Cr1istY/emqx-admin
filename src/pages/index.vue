<template>
    <div>
        首页
    </div>
    <p>

    </p>
</template>

<script setup lang="ts">
import useUserStore from '@/store/index'
import { computed } from 'vue'

const store = useUserStore()

const userInfo = computed(() => {
    return store.getUserInfo
})

</script>