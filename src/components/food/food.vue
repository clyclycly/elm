<template>
  <div class="food" v-show="showFlag" transition="move" v-el:food>
    <div class="content-wrapper">
      <div class="header">
        <img :src="food.image" alt="">
        <span @click="hide">返回</span>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="food-rating">好评率{{food.rating}}%</span>
        </div><!-- detail细节 -->
        <div class="price">
          ¥{{food.price}}
        </div>
        <div class="cartcontrol-wrapper" v-show="food.count && food.count!=0">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" v-show="!food.count || food.count===0" @click="buy($event)" transition="move">
          加入购物车
        </div>
      </div>
      <split></split>
      <div class="info-wrapper" v-show="food.info">
        <div class="title">商品介绍</div>
        <p class="info">{{food.info}}</p>
      </div>
      <split v-show="food.info"></split>
      <div class="rating">
        <h1 class="title">商品评论</h1>
        <ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent"
                      :desc="desc" @content.toggle="contentToggle" @rating.select="ratingSelect"></ratingselect>
      </div>
      <div class="rating-wrapper">
        <ul v-show="food.ratings && food.ratings.length">
          <li class="rating-item" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
            <div class="user">
              <img class="avatar" :src="rating.avatar" width="12px" height="12px" alt="">
              <span class="name">{{rating.username}}</span>
            </div>
            <div class="time">
              <span class="rate-time">{{rating.rateTime}}</span>
            </div>
            <p class="text">
              <span :class="{favour:rating.rateType===0, stamp:rating.rateType===1}"></span>
              {{rating.text}}
            </p>
          </li>
        </ul>
        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
          暂无评价
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vue from 'vue';
  import BScroll from 'better-scroll';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import split from '../split/split.vue';

  const ALL = 10;

  export default {
    props: {
      food: {}
    },
    created() {
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      contentToggle(receive) {
        this.onlyContent = receive;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      ratingSelect(receive) {
        this.selectType = receive;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      /* 父组件点击调用这个方法 */
      show() {
        this.showFlag = true;
        /* 这两个状态每次进入初始化 */
        this.selectType = ALL;
        /* 每次点击的时候只看内容评价为true */
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      buy(event) {
        if (!event._constructed) {
          return;
        }
        vue.set(this.food, 'count', 1);
      }
    },
    components: {
      ratingselect,
      cartcontrol,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/onepx.styl";

  .food
    position fixed
    left 0
    top 0
    bottom 46px
    width 100%
    background-color white
    z-index 50
    &.move-transition
      transition all 0.2s linear
      transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      transform translate3d(100%, 0, 0)
    .content-wrapper
      .header
        position relative
        width 100%
        height 0
        padding-top 100% /* w3c记载padding百分比相对的是宽度 */
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
        span
          position absolute
          cursor: pointer
          top 10px
          left 10px
          padding 10px
          font-size 16px
          color white
      .content
        position relative
        font-size 0
        padding 18px
        .title
          line-height 14px
          font-size 14px
          margin-bottom 8px
          font-weight 700
          color rgb(7, 17, 27)
        .detail
          margin-bottom 18px
          .sell-count, .food-rating
            display inline-block
            font-size 10px
            color rgb(147, 153, 159)
          .food-rating
            margin-left 12px
        .price
          vertical-align top
          line-height 24px
          font-size 16px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right 12px
          bottom 12px
        .buy
          position absolute
          right 12px
          bottom 18px
          font-size 10px
          line-height 24px
          height 24px
          color white
          padding 0 12px
          border-radius 12px
          background-color #00b2ff
          &.move-transition
            transition all 0.4s linear
            opacity 1
            &.move-enter, &.move-leave /* 进入enter---transition,离开transition----leave*/
              opacity 0
      .info-wrapper
        padding 18px
        .title
          line-height 14px
          font-size 14px
          margin-bottom 8px
          font-weight 700
          color rgb(7, 17, 27)
        .info
          line-height 24px
          font-size 12px
          color rgb(77, 85, 93)
      .rating
        padding-top 18px
        background-color white
        .title
          line-height 14px
          font-size 14px
          margin-bottom 6px
          text-indent 18px
          color rgb(7, 17, 27)
      .rating-wrapper
        margin 0 16px
        .rating-item
          padding 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            font-size 0
            .avatar
              margin-right 6px
            .name
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
          .time
            position absolute
            top 16px
            right 0
            font-size 0
            .rate-time
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
          .text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
            margin-top 6px
            .favour
              color #00b2ff
            .stamp
              color rgb(77, 85, 93)
      .no-rating
        font-size 14px
        color rgb(77, 85, 93)
        padding 18px
</style>
