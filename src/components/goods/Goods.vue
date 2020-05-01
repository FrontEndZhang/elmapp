<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li
          v-for="(item,index) in goods"
          :key="index"
          class="menu-item"
          :class="{'current':currentIndex===index}"
          @click="selectMenu($event,index)"
        >
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="food-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="foods-list" ref="food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "network/index";
import classMapMix from "common/js/classMap";
import BScroll from "better-scroll";
const ERR_OK = 0;
export default {
  name: "Goods",
  data() {
    return {
      goods: [],
      listHeight: [],
      scroLLY: 0,
      menuScroll: {},
      foodScroll: {}
    };
  },
  mixins: [classMapMix],
  methods: {
    // 获取数据，并且在得到数据更新dom之后，进行初始化betterScroll
    getSellerData() {
      getGoods()
        .then(res => {
          this.goods = res.data.data;
          this.$nextTick(() => {
            // 初始化俩边的bscroll
            this._initScroll();
            // 计算高度并且获取高度
            this._calculateHeight();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 初始化betterScroll组件
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs["menu-wrapper"], {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs["food-wrapper"], {
        probeType: 3
      });
      // 把Y值传递给scroLLY 来记录滑动位置
      this.foodScroll.on("scroll", pos => {
        this.scroLLY = Math.abs(Math.round(pos.y));
      });
    },
    // 计算每一个food菜单的高度，并且放入数组中
    _calculateHeight() {
      let foodList = this.$refs["food-list-hook"];
      let height = 0;
      this.listHeight.push(height);
      for (let index = 0; index < foodList.length; index++) {
        const element = foodList[index];
        height += element.clientHeight;
        this.listHeight.push(height);
      }
    },
    // 选择右边菜单，左边自动跳到相应位置
    selectMenu(event,index) {
       if (!event._constructed){
         return;
       }
       let foodList = this.$refs['food-list-hook']
       let el = foodList[index]
       this.foodScroll.scrollToElement(el,300)
    }
  },
  created() {
    this.getSellerData();
  },

  computed: {
    // 滑动的时候，计算当前高度，并且范围对应区间的index
    currentIndex() {
      for (let index = 0; index < this.listHeight.length; index++) {
        const height1 = this.listHeight[index];
        const height2 = this.listHeight[index + 1];
        // this.scroLLY在变化，currentIndex自动更新
        if (!height2 || (this.scroLLY >= height1 && this.scroLLY < height2)) {
          return index;
        }
      }
      return 0;
    }
  }
};
</script>
<style scoped lang="less">
@import "~common/less/mixin.less";
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  width: 100%;
  bottom: 44px;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 80px;
      line-height: 14px;
      padding: 0 12px;
      &.current {
        position: relative;
        z-index: 10;
        background: #fff;
        font-weight: 700;
        .text {
          border: none;
        }
        margin-top: -1px;
      }
      .icon {
        .iconmix(2px, 3);
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        .border-1px(rgba(7, 17, 27, 0.1));
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      .border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        .border-none;
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 15);
        }
        .desc {
          margin-bottom: 8px;
        }
        .extra {
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
</style>