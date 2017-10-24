<template>
  <div class="cartControl"><!-- cart计算方式Control控件 -->
    <div class="cart-decrease" @click="decreaseCart($event)" v-show="food.count>0" transition="move">
      <span class="inner">◓</span><!-- inner内部的 -->
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart($event)">◒</div><!--  原生阻止事件$event.cancelBubble = true; 也可以@click.stop @click.prevent就是阻止默认事件-->
  </div>
</template>

<script type="text/ecmascript-6">
  import vue from 'vue'; /* vue.set(this.food, 'count');双向数据绑定food里不存在的count，这里不需要一开始就传入，需点加在传入 */

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        event.cancelBubble = true; /* 事件冒泡 */
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          vue.set(this.food, 'count');
          this.food.count = 1;
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        event.cancelBubble = true;
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          this.food.count = 1;
        } else {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      &.move-transition
        transition all 0.4s linear
        transform translate3d(0, 0, 0)
      /* 3d可以硬件加速 */
      &.move-enter, &.move-leave /* 进入enter---transition,离开transition----leave*/
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
      .inner
        display inline-block
        line-height 24px
        font-size 20px
        color rgb(0, 160, 220)
        transition all 0.4s linear
        transform rotate(0deg)
    .cart-count
      display inline-block
      vertical-align top
      padding-top 6px
      text-align center
      width 12px
      line-height 24px
      font-size 12px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 20px
      color rgb(0, 160, 220)
</style>
