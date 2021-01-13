<template>
    <img :src="result && result.message" style="width:200px;height:200px"/>
</template>
<script lang='ts'>
import axios from 'axios'
import { defineComponent } from 'vue'
export default defineComponent({
    async setup() {
        const rawData = await axios.get('https://dog.ceo/api/breeds/image/random')
        return {
            result: rawData.data
        }
    }
})
</script>
