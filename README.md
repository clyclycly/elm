## Vue版芒果TV

> api api是通过axios绕过接口限制拿到的真实数据

## 使用步骤

``` bash
# 下载
git clone https://github.com/clyclycly/mgtv

# 安装依赖
npm install

# 运行开发环境
npm run dev

# 构建生产环境
npm run build

```
## 截图
![](https://github.com/clyclycly/mgtv/blob/master/mgtv.gif)

## 技术栈
 + vue2.0：基础框架
 + vue-router2：路由跳转
 + vuex：全局数据管理
 + es6：采用部分es6特性，大大简化了写法
 + webpack：vue-cli基于webpack，修改了部分配置
 + axios：基于Promise的http库，用来请求数据
 + style：写起css来十分方便，需要安装style-loader，另外使用自定义其中的自定义函数配合rem来适配移动端设备简直不要太方便
 + flex：弹性布局，在移动端兼容性较好，写各种布局非常方便

 ## 说明
1. 这个项目大小组件大概三十几个，目前还未完工，以后还会继续更新，目标是还原整个芒果TV（虽然不知道什么时候能填完坑o(╯□╰)o）。
2. 关于路由，刚开始设计路由的时候想了很多，由于一开始的目标就是芒果TV的所有内容，所以设计了多级路由，大概这样，[点击查看](https://github.com/clyclycly/mgtv/blob/master/src/router/index.js)。
3. 关于体会，写到这个项目也算是对vue全家桶比较熟了，体会就是，不论是简单的复杂的项目，只要分割成一个个组件再拼起来，也没什么难的，组件之间通信又有vuex，也是非常简单的，总之就是熟能生巧。
4. 关于难点，对于自己来说，audio标签以前没有接触过，有点麻烦，不过还算有[相关文档](http://caibaojian.com/html5-audio.html)
5. 关于移动设备适配，我使用的是js动态设置html元素font-size的方式，页面元素使用rem，这样可达到在不同设备下显示内容基本一样的效果

## 创建新的活动页（# 如添加home页，只要一分钟）
1.[点击查看](https://github.com/clyclycly/mgtv/blob/master/src/router/index.js)里注册你的活动页
``` bash
import Home from 'components/home/home'
   {
     path: '/home',
     component: Home
   }

```
2.[点击查看](https://github.com/clyclycly/mgtv/blob/master/src/components/mg-tab/mg-tab.vue)里添加一个router-link导航
``` bash
      <router-link class="tab-item" to="/home">
        <span class="tab-link">精选</span>
     </router-link>
```
3.[点击查看](https://github.com/clyclycly/mgtv/blob/master/src/components/demo/demo.vue)里传入id就可以生成新的一页
``` bash
<item :id="143"></item>就会生成home页
```
