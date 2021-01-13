# vue3.0--Learn

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 1.vue3 新特性

vue3 支持大多数 2 的特性，支持 2 的写法 1.性能提升：
打包大小减少 41%
初次渲染快乐 55%，更新快 133%
内存使用减少了 54%，得益于重写虚拟 dom 的实现
2.composition API
ref 和 reactive
computed,watch
新的声明周期和函数
自定义函数-Hooks 函数
其他新特性
Teleport -瞬移组件位置
Suspense - 异步加载组件的福音
全局 API 的优化和修改
更好的 Typescript 支持

### 2.为什么要有 vue3

vue2 遇到的难题
随着功能的增长，复杂组件的代码变得难以维护。
vue2 对于 typescript 的支持非常的有限

### 3.响应式对象

    ref和reactive的使用

```
import { ref, computed, reactive, toRefs, onMounted, onUpdated, onRenderTriggered } from 'vue'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: {name?: string };
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
    data.numbers[0] = 5;
    data.person.name = 'viking';
    /**
     * 解决，直接使用return ...data,data中的对象变为正常js对象
     * 没有响应式，使用toRefs，展开的data依旧为响应式对象
     */
    const refData = toRefs(data)
    return {
      ...refData
    }
  }
});
```

### 4.新的生命周期

```
beforeCreate -> use setup()
created -> use setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestory -> onBeforeUnmount
destoryed -> onUnmounted
activated -> onActivated
deactivated -> onDeactivated
errorCaptured -> onErrorCaptured

//调试
onRenderTracked
onRenderTriggered
```

### 4.watch 的使用

```
const data: DataProps = reactive({
	count: 0,
	increase: () => {data.count++}
})
const greetings = ref('')
const updateGreetings = () => {
	greetings.value += 'hello!'
}
//监听greetings值的变化
watch(greetings, (newValue, oldValue) => {
	console.log(newValue, oldValue)
	document.title = 'updated' + greetings.value
})
 /**
 * watch多个值,第一个参数可以是个数组
 */
watch([greetings, data], (newValue, oldValue) => {
	console.log(newValue, oldValue)
	document.title = 'updated' + greetings.value
})

/**
* watch，data中的单个值,不能data.count进行watch.这样count会变成number类型，不是响应式对象了
* 写成一个function进行watch。
* watch，监听响应式数据的变化。进行数据处理
*/
watch([greetings, () => data.count], (newValue, oldValue) => {
	console.log(newValue, oldValue)
	document.title = 'updated' + greetings.value
})
return {
	...refData,
	greetings,
	updateGreetings
}
```

### Suspense

    异步请求的困境，需要判断请求的状态，展示不同界面。
    Suspense是vue3推出的一个内置的特殊组件，他会有两个template，
    刚开始会渲染一个fallback内容，直到达到条件后，渲染正式的内容。
    如果要使用Suspense，在setup中返回一个promise，而不是直接返回对象。

```

```
