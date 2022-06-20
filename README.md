# `vue-skeletion`

骨架屏的解决方案大致分为三个方向:

1. 三方UI库中的skeleton组件, 例如ant-design-vue, 以组件的方式进行布局

    ```vue
    <template>
      <a-skeleton avatar :paragraph="{ rows: 4 }" />
    </template>
    ```

2. 使用webpack插件根据页面结构动态生成全页面的骨架，例如：饿了吗的page-skeleton-webpack-plugin

3. 根据原dom结构添加class，使用骨架背景填充，单一dom的最小维度

**vue-skeletion** 采用第三种处理方式


## 安装

### npm

```bash
npm i vue-skeleton -S
```

### yarn

```bash
yarn add vue-skeleton
```

## 使用

main.js:

```javascript
import { createApp } from 'vue';
import App from './app.vue';
import skeleton from 'vue-skeleton';
createApp(App)
  .use(skeleton)
  .mount('#app');
```

template:

```html
<div>
  <h1 v-skeleton :data-skeleton="isSkeleton">
   {{ title }}
  </h1>
</div>
<script setup>
const isSkeleton = ref(false);
// 模拟请求
setTimeout(() => {
  isSkeleton.value = true
}, 5000);
</script>
```
