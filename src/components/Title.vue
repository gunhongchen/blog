<template>
  <div class="title">
    <div class="content">
      <span>{{ title }}</span>
      <div class="route_btn" v-if="backurl">
        <router-link :to="backurl">
          <p>返回列表</p>
        </router-link>
      </div>
      <div class="float-right">
        <slot name="btn"></slot>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Title extends Vue {
  @Prop() title!: string;
  @Prop() backurl!: string;
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/public.scss";
.title {
  background-color: #fff;
  .content {
    padding: 16px 24px;
    p {
      color: $color-link;
    }
  }
  span {
    display: inline-block;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.65);
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    background: #fff;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.4;
  }
  .route_btn {
    float: right;
  }
  .line {
    height: 1px;
    background-color: $color-4;
    box-shadow: 0 3px 3px $color-4;
  }
}
</style>