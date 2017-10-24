<template>
  <!-- goods商品,foods食品 -->
  <!--这里很简单利用setTimeout(function(){},1000);让display为1秒钟的block，下拉更多就更简单了，用for循环if>X-->
  <div style="line-height: 50px;text-align: center;position: absolute;z-index: 100;background-color:rgba(0,0,0,0.2);width: 100%;display: none">刷新成功</div>
  <div class="goods">
    <!-- menu菜单 -->
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li class="menu-item" v-for="item in goods" :class="{current:currentIndex===$index}"
            @click="selectMenu($index,$event)">
          <span class="text border-1px">
             <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <div style="margin-top: -40px;line-height: 40px;text-align: center;position: absolute;width: 100%">{{a}}</div>
        <li v-for="item in goods" class="food-list food-list-hook"><!-- hook表明只是用来被js选择 -->
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" @click="selectFood(food,$event)" class="food-item">
              <div class="content-wrapper">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc" v-if="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="prices">
                    <span class="price">¥{{food.price}}</span><s class="former">¥{{food.price+2}}</s>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>

    </div>
    <!--delivery-price配送价，min-price起送价 -->
    <v-shopcart :select-foods="selectedFoods" :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice"></v-shopcart>
    <food :food="selectedFood" v-ref:food></food>
  </div>
  <!-- 得到屏幕的高`  1 position absolute      2 top x      3 bottom x -->
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';   /* ie10都不能用 */
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import food from '../food/food.vue';

  const ERR_OK = 0;

  export default {
    props: {  // props接收seller(接口)
      seller: ''
    },
    data() {  // 数据
      return {
        a: '下拉刷新',
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    created() { //  created构造函数，实例已经创建=created: function () //es6的简写
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then((response) => {
        /*   =>是es6语法中的箭头（arrow）函数  (response) => {} 等同 function(response) {}
         1 () => { ... } // 零个参数用 () 表示；
         2 x => { ... } // 一个参数可以省略 ()；
         3 (x, y) => { ... } // 多参数不能省略 ()；
         x => { return x * x }; // 函数返回 x * x
         x => x * x; // 同上一行    等于function(x){ return x * x}
         x => return x * x; // SyntaxError 报错，不能省略 {}
         x => { x * x }; // 合法，没有定义返回值，返回 undefined
         */
        response = response.data;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => { /* $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调 */
            this.initScroll();
            this.calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {  // pc端会click两次这个函数(派生一次),其中原生那次不会执行，因为pc端没有event._constructed这个属性（手机端默认就是一次）
          return;
        }
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 200);
        /* scrollToElement方法，滚动el的位置 */
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        /* 父组件加v-ref:food可以调用子组件的数据 */
        this.$refs.food.show();
      },
      initScroll() {
        /* 操作dom加$els,一开始阻止所有事件，需要点击事件加click: true*/
        this.meunScroll = new BScroll(this.$els.menuWrapper, {
          click: true
          // scrollX: true;横向滚动（默认scrollX: true;scrollY: flash;）
        });
        this.foodScroll = new BScroll(this.$els.foodsWrapper, {
          click: true,
          probeType: 3  /* probeType: 1,2也可以 */
        });
        /* on是better-scrolll的方法，参数scroll是滑动中执行函数，参数touchend是下拉完执行这个方法 */
        this.foodScroll.on('scroll', (pos) => {
          /* Math.round()整数，Math.abs()绝对值 */
          this.scrollY = Math.abs(Math.round(pos.y));
          // 恢复文本值
          this.a = '下拉刷新';
          if (pos.y > 40) {
            this.a = '释放立即刷新';
          }
        });
        this.foodScroll.on('touchend', () => {
          console.log(1);
        });
      },
      calculateHeight() {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);                 // push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          /* height = height + item.clientHeight;*/
          /* clientHeight/clientWidth元素可见的高度 */
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    computed: {
      /* current现在Index索引 */
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          /* &&且 ll或 3>2>1 为flash 一开始3>2为true，在隐士转化为1与1比价 */
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
      },
      selectedFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            /* 点谁添加谁的数据 */
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    components: {
      'v-shopcart': shopcart,
      cartcontrol,
      food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/onepx.styl"

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px /* 安卓兼容 */
      background-color #f3f5f7
      overflow hidden
      .menu-item
        display table /* 类似table标签，优点有height的时候也能被撑高 */
        width 56px
        padding 0 12px
        height 54px
        line-height 14px
        &.current
          background-color white
          .text
            font-weight 700
        .text
          display table-cell /* 类似td(优点填充父盒子的高）;加上vertical-align middle这个就和表单一样了，我也不知道为什么*/
          vertical-align middle /* 原本是子元素middle线与父盒子基线加2/1x高度对齐，这里配合display table做固定高多行垂直居中(表单效果)*/
          width 56px
          font-size 12px
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display inline-block
            vertical-align top
            margin-top 1px
            width 12px
            height 12px
            margin-right 2px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image(decrease_3)
            &.discount
              bg-image(discount_3)
            &.guarantee
              bg-image(guarantee_3)
            &.invoice
              bg-image(invoice_3)
            &.special
              bg-image(special_3)
    .foods-wrapper
      flex 1
      overflow height
    .food-list
      .title
        line-height 26px
        font-size 12px
        text-indent 6px
        color rgb(147, 153, 159)
        background-color #f3f5f7
        border-left 1px solid #d9dde1
      .food-item
        padding 18px 0
        margin 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .content-wrapper
          display flex
          font-size 0
          .icon
            display inline-block
            img
              flex 0 0 57
              vertical-align top
              margin-right 10px
              width 57px
              height 57px
          .content
            flex 1
            display inline-block
            vertical-align: top
            overflow hidden
            .name
              margin-top 2px
              margin-bottom 8px
              font-size 14px
            .desc, .extra
              line-height 10px
              font-size 10px
              color: rgb(147, 153, 159);
            .desc /* white-space: nowrap //  这玩意父盒子有固定宽度继承，父盒子没有固定宽度就是撑开的宽度 当flex： 1没有固定宽度
              overflow hidden
              text-overflow ellipsis // 等于...  */
              margin-bottom 8px
            .extra
              .count
                margin-right 5px
            .prices
              line-height 24px
              margin-top 5px
              .price
                vertical-align top
                font-size 16px
                font-weight 700
                color rgb(240, 20, 20)
                margin-right 8px
              .former
                vertical-align top
                font-size 10px
                color rgb(147, 153, 159)
            .cartcontrol-wrapper
              position absolute
              right 0
              bottom 12px
</style>
