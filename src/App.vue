<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <ul>
    <li v-for="number in numbers" :key="number">
      <h1>{{number}}</h1>
    </li>
    <h1>{{person.name}}</h1>
  </ul>
  <h1>{{greetings}}</h1>
  <h1 v-if="loading">Loading...</h1>
  <img v-if="loaded" :src='result[0].url'/>
  <h1>x:{{x}}y:{{y}}</h1>
  <button @click="increase">加加</button>
  <button @click="updateGreetings">title</button>
</template>

<script lang="ts">
// import { defineComponent } from 'vue';
// import HelloWorld from './components/HelloWorld.vue';
import { ref, computed, reactive, toRefs, onMounted, onUpdated, onRenderTriggered, watch, onUnmounted } from 'vue'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: {name?: string };
}
interface DogResult {
    message: string;
    status: string;
}
interface CatResult {
    id: string;
    url: string;
    width: number;
    height: number;
}
export default ({
  name: 'App',
  setup() {
    /**
     *  // // 响应式数据类型ref
     */
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   console.log(count)
    //   count.value++
    // }
    // return {
    //   count,
    //   increase,
    //   double
    // }
    onMounted(() => {
      console.log('onMounted')
    })
    onUpdated(() => {
      console.log('onUpdate')
    })
    onRenderTriggered((event) => {
      console.log(event)
    })
    const data: DataProps = reactive({
      count: 0,
      // 1。修改值不需要想ref一样.value
      increase: () => {data.count++},
      /**
       * 由于computed回调中使用data.count会造成类型推论循环
       * vue3局限性，暂时不能解决，自动把data推断成any类型
       * 需要显示的给data指定一个类型
       */
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person:{}
    })
    const greetings = ref('')
    const updateGreetings = () => {
      console.log(111)
      greetings.value += 'Hello!'
    }

    /**
     * 鼠标点击坐标位置
     */
    // const x = ref(0)
    // const y = ref(0)
    // const updatteMouse = (e: MouseEvent) => {
    //     x.value = e.pageX
    //     y.value = e.pageY
    // }
    // onMounted(() => {
    //     document.addEventListener('click', updatteMouse)
    // })
    // onUnmounted(() => {
    //     document.removeEventListener('click', updatteMouse)
    // })
    // watch(greetings, (newValue, oldValue) => {
    //   console.log(newValue, oldValue)
    //   document.title = 'updated' + greetings.value
    // })
    /**
     * watch多个值,第一个参数可以是个数组
     */
    // watch([greetings, data], (newValue, oldValue) => {
    //   console.log(newValue, oldValue)
    //   document.title = 'updated' + greetings.value
    // })
    /**
     * watch，data中的单个值,不能data.count进行watch.这样count会变成number类型，不是响应式对象了
     * 写成一个function进行watch。
     * watch，监听响应式数据的变化。进行数据处理
     */
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log(newValue, oldValue)
      document.title = 'updated' + greetings.value
    })
    data.numbers[0] = 5;
    data.person.name = 'viking';

    /**
     * 自定义hooks，ts泛型改造
     * https://dog.ceo/api/breeds/image/random
     */
    const { x, y} = useMousePosition()
    const { result, loading, loaded } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    watch(result, () => {
        if(result.value) {
            console.log('value', result.value[0].url)
        }
    })
    /**
     * 解决，直接使用return ...data,data中的对象变为正常js对象
     * 没有响应式，使用toRefs，展开的data依旧为响应式对象
     */
    const refData = toRefs(data)
    return {
      ...refData,
      greetings,
      updateGreetings,
      x,
      y,
      result, 
      loading, 
      loaded
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
