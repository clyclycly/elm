<template>
  <div class="ratings">
    <div class="again-wrapper">
      <div id="body" v-el:menu-wrapper class="again">
        <ul>
          <li class="again-item" :class="{mack:againImg[$index].indexes===1}" v-for="again in againImg.length">
            <img class="again-img" :src="againImg[$index].img" alt="">
            <span class="again-text">{{againImg[$index].text}}</span>
          </li>
        </ul>
      </div>
      <div class="again-dot">
        <ul>
          <li class="dot-item" @click="clickChange($index)" v-for="again in againImg.length"
              :class="{mack:againImg[$index].indexes===1}"></li>
        </ul>
      </div>
      <div class="button-wrapper">
        <div class="button again-left" @click="againDecrease"></div>
        <div class="button again-right" @click="againAdd"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {}
    },
    data() {
      return {
        againImg: [
          {
            indexes: 0,
            img: '//gw.alicdn.com/imgextra/i4/153/TB2_aSLaUvMR1JjSZPcXXc1tFXa_!!153-0-luban.jpg_q50.jpg',
            text: '好大一棵二叉树黄昏'
          },
          {
            indexes: 0,
            img: '//img.alicdn.com/imgextra/i2/18/TB2ay3TglcHL1JjSZFBXXaiGXXa_!!18-0-luban.jpg_q50.jpg',
            text: '暮霭漫漫'
          },
          {
            indexes: 0,
            img: '//aecpm.alicdn.com/tfscom/TB16pnZX3oQMeJjy0FpXXcTxpXa.jpg_q50.jpg',
            text: '谁在寂寞的遍历树上每一个结点？'
          },
          {
            indexes: 0,
            img: '//gw.alicdn.com/imgextra/i3/188/TB2xlJ7anJ_SKJjSZPiXXb3LpXa_!!188-0-luban.jpg_q50.jpg',
            text: '你从无边的代码中抬起头，瞬间淹没了每一字节'
          }
        ],
        now: 0
      };
    },
    created() {
      /*
       * 图片轮播
       * */
      let length = this.againImg.length;
      this.againImg[0].indexes = 1; // 不需要进来等3秒
      let timer = setInterval(() => {  /* 必须用es6的（）=> {}函数，用function(）{} 干他娘报了一个小时的错 */
        this.now++;
        if (this.now >= length) {
          this.now = 0;
        }
        this.sole();
      }, 5000);
      /*
       * 手势滚动
       * */
      this.$nextTick(() => {
        let initialPosition = 0;
        this.$els.menuWrapper.addEventListener('touchstart', (event) => {
          window.clearInterval(timer);
          initialPosition = event.changedTouches[0].clientX;
        });
        this.$els.menuWrapper.addEventListener('touchend', (event) => {
          timer = setInterval(() => {  /* 必须用es6的（）=> {}函数，用function(）{} 干他娘报了一个小时的错 */
            this.now++;
            if (this.now >= length) {
              this.now = 0;
            }
            this.sole();
          }, 5000);
          let stopPosition = event.changedTouches[0].clientX;
          if ((initialPosition - stopPosition) > 0) {
            this.againAdd();
          } else {
            this.againDecrease();
          }
        });
      });
    },
    methods: {
      /*
       * 隐藏全部，显示自己
       * */
      sole() {
        for (let i = 0; i < this.againImg.length; i++) {
          this.againImg[i].indexes = 0;
        }
        this.againImg[this.now].indexes = 1;
      },
      /*
       * 加减方法
       * */
      againDecrease() {
        this.now--;
        if (this.now < 0) {
          this.now = this.againImg.length - 1;
        }
        this.sole();
      },
      againAdd() {
        this.now++;
        if (this.now > this.againImg.length - 1) {
          this.now = 0;
        }
        this.sole();
      },
      /*
       * 小点点击方法
       * */
      clickChange(index) {
        this.now = index;
        this.sole();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .again-wrapper
    position relative
    .again
      overflow hidden
      .again-item
        display none
        width 100%
        &.mack
          display block
          overflow hidden
          animation: change 1s
        @keyframes change
          0%
            display block
          100%
            transform rotate(0deg) scale(1.1)
        .again-img
          width 100%
        .again-text
          position: absolute;
          bottom: 0;
          color: white;
    .again-dot
      position absolute
      bottom 10px
      right 10px
      .dot-item
        display inline-block
        width 12px
        height 12px
        margin-left 5px
        background-image url("./white.png")
        background-size 12px 12px
        background-repeat no-repeat
        &.mack
          background-image url("./black.png")
    .button-wrapper
      .button
        position absolute
        top 32%
        width 6%
        height 36%
        background-size 12px 12px
        background-repeat no-repeat
        background-color rgba(0, 0, 0, 0.6)
      .again-left
        left 0
      .again-right
        right 0
</style>
