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
### 1.vue3新特性
vue3支持大多数2的特性，支持2的写法
        1.性能提升：
            打包大小减少41%
            初次渲染快乐55%，更新快133%
            内存使用减少了54%，得益于重写虚拟dom的实现
        2.composition API
            ref和reactive
            computed,watch
            新的声明周期和函数
            自定义函数-Hooks函数
        其他新特性
            Teleport -瞬移组件位置
            Suspense - 异步加载组件的福音
            全局API的优化和修改
        更好的Typescript支持
### 2.为什么要有vue3
 vue2遇到的难题
            随着功能的增长，复杂组件的代码变得难以维护。
            vue2对于typescript的支持非常的有限
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