<template>
  <div class="shopcart">    <!-- shopcart购物车 -->
    <div class="content" @click="toggleList()">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:totalCount>0}">
            <span :class="{highlight:totalCount>0}">轩</span>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price-wrapper">
          <div class="price" :class="{highlight:totalPrice>0}">¥ {{totalPrice}}</div>
          <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
        </div>
      </div>
      <div class="content-right">
        <!--  原生阻止事件$event.cancelBubble = true; 也可以@click.stop @click.prevent就是阻止默认事件-->
        <div class="pay" :class="{enough:(this.minPrice<=this.totalPrice)}" @click.stop.prevent="pay()">
          {{payState}}
        </div>
      </div>
      <div class="content-list" v-show="listShow" transition="move">
        <div class="list-header">
          <div class="title">购物车</div>
          <div class="empty" @click="empty()">清空</div>
        </div>
        <div class="list-content" v-el:list-content>
          <ul>
            <li class="shopcart-food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">¥ {{food.price*food.count}}</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="shopcart-background" v-show="listShow" transition="move" @click="toggleList()"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';   /* ie10都不能用 */
  import cartcontrol from '../cartcontrol/cartcontrol.vue';

  export default {
    props: {
      selectFoods: {
        /* 1挑选商品2传值时小写加中划线 */
        type: Array,
        default() {
          return [{
            price: 10, /* foods单价 */
            count: 1  /* 每一件商品购买数量 */
          }
          ];
        }
      },
      deliveryPrice: {
        /* 配送价 */
        type: Number,
        default: 0
      },
      minPrice: {
        /* 起送价 */
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        fold: true
      };
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      initScroll() {
        this.Scroll = new BScroll(this.$els.listContent, {
          click: true
          // scrollX: true;横向滚动（默认scrollX: true;scrollY: flash;）
        });
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert('支付' + this.totalPrice + '元'); /* ``反引号就是`xx${this.totalPrice}xx` */
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {  /* forEach是ECMA5中Array新方法中最基本的一个，就是遍历，循环。 */
          total += food.price * food.count;
        });
        return total;
      }, /* 价格 */
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      }, /* 购买数量 */
      payState() {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`;
          /* es6中1旁边的反引号`可以配合${}使用不用写加号 */
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差¥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      listShow() {
        if (!this.totalCount) {  /* !this.totalCount就是等于0的时候  if不为0的时候返回true，为0返回flash */
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => { /* dom更新后立即调用这个方法 */
            if (!this.scroll) { /* 不存在时调用，保证调用一次,但是要加this.scroll.refresh()才能滚动 */
              this.scroll = new BScroll(this.$els.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    components: {
      cartcontrol
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/onepx.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 99
    width 100%
    height 48px
    .content
      display flex
      background-color #141d27
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          background-color #141d27
          box-sizing border-box /* ie盒模型，宽度包括padding与border(现在ie都是普通盒子模型，而且ie7还不支持ie盒模型属性) */
          border-radius 50%
          .logo
            width 100%
            height 100%
            text-align center
            background-color rgba(255, 255, 255, 0.2)
            border-radius 50%
            &.highlight
              background-color rgb(0, 160, 220)
            span
              line-height 44px
              font-size 18px
              color rgba(255, 255, 255, 0.4)
              &.highlight
                color white
          .num
            position absolute
            top 0
            right 0
            text-align center
            width 24px
            height 16px
            font-size 9px
            line-height 16px
            font-weight 700
            color white
            background-color rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            border-radius 16px
        .price-wrapper
          display inline-block
          vertical-align top
          margin-top 10px
          color rgba(255, 255, 255, 0.4)
          .price
            font-size 16px
            font-weight 700
            &.highlight
              color white
          .desc
            height 10px
            overflow hidden
            font-size 10px
            margin-top 2px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color rgba(255, 255, 255, 0.4)
          background-color #2b333b
          &.enough
            color white
            background-color #00b43c
      .content-list
        position fixed
        z-index -30
        left 0
        bottom 48px
        width 100%
        font-size 16px
        background-color white
        &.move-transition
          transition all 0.4s linear
          transform translate3d(0, 0, 0)
        /* 3d可以硬件加速 */
        &.move-enter, &.move-leave /* 进入enter---transition,离开transition----leave*/
          transform translate3d(0, 100%, 0)
        .list-header
          line-height 40px
          padding 0 18px
          background-color #f3f5f7
          border-1px(rgba(7, 17, 27, 0.1))
          .title
            display inline-block
            color rgb(7, 17, 27)
        .empty
          display inline-block
          position absolute
          right 18px
          color rgb(0, 160, 220)
        .list-content
          max-height 212px
          overflow hidden
          .shopcart-food
            margin 0 18px
            line-height 48px
            border-1px(rgba(7, 17, 27, 0.1))
            .name
              display inline-block
              vertical-align: top
              font-size 14px
              color rgb(7, 17, 27)
            .price
              position absolute
              right 90px
              display inline-block
              vertical-align: top
              font-size 14px
              font-weight 700
              color rgb(240, 20, 20)
            .cartcontrol-wrapper
              position absolute
              right 0
              display inline-block
              vertical-align: top
              margin-top 6px
              line-height 0

  .shopcart-background
    position fixed
    top 0 /* 不写会继续父亲的top */
    width 100%
    height 100%
    z-index -50
    background-color #000000
    &.move-transition
      transition all 0.2s linear
      opacity 0.5
    &.move-enter, &.move-leave /* 进入enter---transition,离开transition----leave*/
      opacity 0
</style>
