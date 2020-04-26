<template>
  <div class="header">
    <!-- 店铺信息相关 -->
    <div class="content-wrapper">
      <!-- 头像 -->
      <div class="avatar">
        <img width="64" height="64" :src="avatar" :alt="seller.avatar" srcset />
      </div>
      <!-- 店铺信息 -->
      <div class="content">
        <!-- 标题和牌子 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{name}}</span>
        </div>
        <div class="description">{{description}}/{{deliveryTime}}分钟送达</div>
        <!-- 优惠 -->
        <div v-if="supports" class="support">
          <span class="icon" :class="type"></span>
          <span class="text">{{supportsdec}}</span>
        </div>
        <div v-if="supports" class="support-count" @click="showDetail()">
          <span class="count">{{length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <!-- 公告 -->
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{bulletintext}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="avatar" height="100%" width="100%" alt srcset />
    </div>
    <!-- 弹层页面 -->
    <transition name="fade">
      <div class="detail" v-show="detailShow" transition="fade">
        <!-- sticky footer布局 -->
        <div class="detail-wrapper clearfix">
          <!-- 内容容器 -->
          <div class="detail-main">
            <!-- 主要内容 -->
            <h1 class="name">{{name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">商铺信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="supports" class="supports">
              <li class="supports-item" v-for="(item,index) in supports" :key="index">
                <span class="icon" :class="classMap[supports[index].type]"></span>
                <span class="text">{{supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bullentin">
              <p class="content">{{bulletintext}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hedeDetail()">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from "components/star/Star";
export default {
  name: "Header",
  data() {
    return {
      classMap: [],
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = !this.detailShow;
    },
    hedeDetail() {
      this.detailShow = !this.detailShow;
    }
  },
  props: {
    seller: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
  },
  computed: {
    avatar() {
      return this.seller.avatar;
    },
    name() {
      return this.seller.name;
    },
    description() {
      return this.seller.description;
    },
    deliveryTime() {
      return this.seller.deliveryTime;
    },
    type() {
      return this.classMap[this.seller.supports[0].type];
    },
    supportsdec() {
      return this.seller.supports[0].description;
    },
    supports() {
      return this.seller.supports;
    },
    length() {
      return this.supports.length;
    },
    bulletintext() {
      return this.seller.bulletin;
    }
  },
  components: {
    Star
  }
};
</script>

<style scoped lang="less">
@import "~common/less/mixin.less";
.header {
  position: relative;
  color: #fff;
  // 颜色滤镜，这样就可以透过背景颜色看到背景图
  background: rgba(7, 17, 27, 0.5);
  // blur会有点阴影，hidden就OK了
  overflow: hidden;
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    // 让其字标签能够紧密贴合
    font-size: 0;
    .avatar {
      font-size: 14px;
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8 px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          .bg-image("brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 8px;
        margin-top: 8px;
        line-height: 20px;
        font-size: 12px;
      }
      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image("decrease_1");
          }
          &.discount {
            .bg-image("discount_1");
          }
          &.guarantee {
            .bg-image("guarantee_1");
          }
          &.invoice {
            .bg-image("invoice_1");
          }
          &.special {
            .bg-image("special_1");
          }
        }
        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          color: white;
          font-size: 10px;
        }
        .icon-keyboard_arrow_right {
          display: inline-block;
          // vertical-align: text-top;
          margin-left: 2px;
          // margin-top: -14px;
          line-height: 24px;
          font-size: 12px;
        }
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    background-color: yellowgreen;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    // 换行
    white-space: nowrap;
    // 把换行的隐藏掉
    overflow: hidden;
    // 隐藏掉以...的形式展现
    text-overflow: ellipsis;

    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 7px;
      width: 22px;
      height: 12px;
      .bg-image("bulletin");
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      vertical-align: top;
      margin: 0 4xp 3px 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 9px;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    // 模糊
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    transition: all 1s;
    background: rgba(7, 17, 27, 0.8);
    &.fade-transition {
      opacity: 1;
      background: rgba(7, 17, 27, 0.8);
    }
    &.fade-enter,
    &.fade-leave {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      margin-bottom: -64px;
      .detail-main {
        padding-top: 64px;
        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .supports-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                .bg-image("decrease_2");
              }
              &.discount {
                .bg-image("discount_2");
              }
              &.guarantee {
                .bg-image("guarantee_2");
              }
              &.invoice {
                .bg-image("invoice_2");
              }
              &.special {
                .bg-image("special_2");
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .bullentin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      height: 32px;
      width: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>