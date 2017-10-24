<template>
  <!-- rating对什么评论 select挑选 -->
  <div class="rating-select">
    <div class="rating-type">
      <span class="block positive" @click="select(10)" :class="{active:selectType===10}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span class="block positive" @click="select(0)" :class="{active:selectType===0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1)" :class="{active:selectType===1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div class="rating-switch">
      <span class="toggle" @click="toggleContent($event)" :class="{on:onlyContent}">⊙</span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 10;
  const POSITIVE = 0;
  const NEGATIVE = 1;

  export default {
    props: {
      ratings: {
        type: Array,
        /* default不传值时默认。数组和对象是default()方法，数组和对象用default其实也可以正常显示，但是控制台报错 */
        default() {
          return [];
        }
      },
      /* 被挑选的。 0，1,2分别代表 全部 ，推荐，吐槽*/
      selectType: {
        type: Number,
        /* 不直接写0是因为要使用ALL这个变量 */
        default: ALL
      },
      /* 只看内容(Content)评价 */
      onlyContent: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    methods: {
      /* 点击这个方法，selectType=点击按钮的传参 */
      select(type) {
        this.selectType = type;
        /* 子组件通知父组件 */
        this.$emit('rating.select', type);
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        /* 子组件通知父组件 */
        this.$emit('content.toggle', this.onlyContent);
      }
    },
    computed: {
      positives() {
        /* filter滤镜 对数组中的每个元素都执行一次指定的函数，并且创建一个新的数组，该数组元素是所有回调函数执行时返回值为 true 的原数组元素。*/
        /* 简单的说就是循环后创建一个数组，该数组是return为true的 */
        /* 数组中rateType为0的 */
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        /* 数组中rateType为1的  */
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/onepx.styl";

  .rating-select
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
    .block
      display inline-block
      padding 8px 12px
      border-right 1px
      margin-right 8px
      line-height 16px
      font-size 12px
      .count
        font-size 8px
        margin-left 2px
      &.active
        color white
      &.positive
        background-color rgba(0, 160, 220, 0.2)
        &.active
          background-color rgb(0, 160, 220)
      &.negative
        background-color rgba(77, 85, 93, 0.2)
        &.active
          background-color rgb(77, 85, 93)
    .rating-switch
      padding 12px 18px
      line-height 24px
      border-1px(rgba(7, 17, 27, 0.1))
      color rgb(143, 153, 159)
      font-size 0
      .toggle
        display inline-block
        vertical-align: top
        font-size 16px
        margin-right 6px
        &.on
          color #00b2ff
      span
        display inline-block
        vertical-align: top
        font-size 12px
</style>
