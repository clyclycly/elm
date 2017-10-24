<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img class="img" :src="seller.avatar" width="64" alt="">
      </div>  <!-- avatar头像 -->
      <div class="content">
        <div class="title">
          <span class="brand"></span> <!-- brand品牌 -->
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description"> <!-- description描述 -->
          {{seller.description}}/{{seller.deliveryTime}}
        </div>
        <div class="supports" v-if="seller.supports"> <!-- supports支持 -->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="count" v-if="seller.supports" @click="detailShow=true">
        <span class="">{{seller.supports.length}}个</span>
        <span class="">></span>
      </div><!-- count总数 -->
    </div><!-- wrapper包装纸 -->
    <div class="bulletin-wrapper" @click="detailShow=true">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="">></i>
    </div><!-- bulletin公告 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <div v-show="detailShow" class="detail"><!-- detail详情 -->
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <v-star :size="48" :score="seller.score"></v-star>
          </div>
          <div class="title">
            <!-- span会有兼容性问题 -->
            <div class="line"></div>
            <div class="text">sticky footers布局</div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="detailShow=false">x</div> <!-- close关闭 -->
    </div>
    <!--
    sticky footers布局
    结构
    <div> overflow auto
      <div> min-height 100%如果一层的话，最小高度为min-height加padding了
        <div>
             padding-top x
             padding-bottom x
        </div>
      </div>
      <div>
        margin-top -x
      </div>
   </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';

  export default {
    props: {
      seller: {}
    },
    components: {
      'v-star': star
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    data() {  // 数据
      return {
        classMap: [],
        detailShow: false
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/onepx.styl";

  .header
    position relative
    overflow hidden
    color white
    background-color rgba(7, 17, 27, 0.5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0 /*  让display inline-block没有空隙 */
      .avatar
        display inline-block
        vertical-align: top
        .img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align: top
            width 30px
            height 18px
            bg-image(brand)
            background-size 30px 18px
            background-repeat no-repeat
          .name
            display inline-block
            vertical-align top
            margin-left 6px
            line-height 18px
            font-size 32px
            position absolute
            font-weight bold
            white-space: nowrap;
            transform: scale(0.5);
            transform-origin: 0 50%
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .supports
          height 12px
          overflow hidden
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image(decrease_1)
            &.discount
              bg-image(discount_1)
            &.guarantee
              bg-image(guarantee_1)
            &.invoice
              bg-image(invoice_1)
            &.special
              bg-image(special_1)
          .text
            vertical-align top
            line-height 12px
            font-size 20px
            font-weight bold
            margin-left 4px
            position absolute
            white-space nowrap
            transform scale(0.5)
            transform-origin 0 50%
      .count
        position absolute
        right 12px
        bottom 10px
        text-align center
        padding 0 8px
        border-radius 12px
        font-size 12px
        height 24px
        line-height 24px
        background-color rgba(0, 0, 0, 0.2)
    .bulletin-wrapper
      position relative
      line-height 28px
      height 28px
      padding 0 22px 0 12px
      background-color rgba(7, 17, 27, 0.2)
      .bulletin-title
        display inline-block
        vertical-align: top;
        margin-top 8px
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
      .bulletin-text
        vertical-align top
        margin-left 4px
        font-size 20px
        position absolute
        white-space nowrap
        width 31rem
        overflow hidden
        text-overflow: ellipsis;
        transform scale(0.5)
        transform-origin 0 50%
      i
        position absolute
        font-size 12px
        right 12px
    .background
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      height 100%
      filter blur(10px)
    /* 高斯模糊10px */
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      background-color rgba(7, 17, 27, 0.8)
      .detail-wrapper
        min-height 100%
        .detail-main
          padding-top 64px
          padding-bottom 64px
          .name
            text-align center
            line-height 16px
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 18px
            padding 2px 0
            text-align center
          .title
            display flex
            width 80%
            margin 30px auto 24px auto
            .line
              flex 1
              position relative
              top -6px
              border-1px(rgba(255, 255, 255, 0.2))
            .text
              padding 0 12px
              font-size 14px
      .detail-close
        text-align center
        width 32px
        height 32px
        margin -64px auto 0 auto
        font-size 32px
        color rgba(255, 255, 255, 0.5)
</style>
