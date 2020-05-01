<template>
  <div id="app">
    <elm-header :seller="seller"></elm-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" tag="a">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" tag="a">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" tag="a">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ElmHeader from "components/header/Header";
import { getSeller } from "network/index";

export default {
  name: "App",
  components: {
    ElmHeader
  },
  data() {
    return {
      seller: {}
    };
  },
  methods: {
    getSellerData() {
      getSeller()
        .then(res => {
          this.seller = res.data.data;
        })
        .catch(err => {
        });
    }
  },
  created() {
    // 获取seller数据
    this.getSellerData();
  }
};
</script>

<style lang="less">
@import "./assets/css/base.css";
@import "~common/less/mixin.less";
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  .border-1px(rgba(7, 17, 27, 0.1));
  .tab-item {
    flex: 1;
    text-align: center;
    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
