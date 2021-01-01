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