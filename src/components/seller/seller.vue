<template>
  <div class="seller" @click="aa" :class="{'active':a}">
    <div class="txt">{{msg()}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        a: false
      };
    },
    methods: {
      aa() {
        this.a = !this.a;
      },
      msg() { // 写成计算属性，我是懒得弄
        return this.a ? '收藏' : '未收藏';
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .seller
    position relative
    width 60%
    padding-top 60%
    margin-top 20%
    margin-left 20%
    border-radius 50%
    background-color #cccccc
    &.active
      background-color rgb(240, 20, 0)
    .txt
      position absolute
      width 100%
      text-align center
      top 48%
      font-size 20px
      color white
</style>
