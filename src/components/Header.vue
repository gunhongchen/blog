<template>
  <div class="header">
      <div class="title size-main color-2">
          {{title}}
      </div>
      <div class="menu">
        <el-menu :default-active="activeIndex" :router="true" class="el-menu-demo" mode="horizontal">
          <template v-for="(item, index) in menus">
            <el-menu-item v-if="!item.children" :key="index" :index="item.url">{{item.name}}</el-menu-item>
            <el-submenu v-if="item.children" :key="index" :index="item.url">
              <template slot="title">{{item.name}}</template>
              <template v-for="(itemChild, itemChildIndex) in item.children">
                <el-menu-item :key="itemChildIndex" :index="itemChild.url">{{itemChild.name}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
        <!-- <div class="line"></div> -->
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Header extends Vue {
  @Prop() private title!: string;
  @Prop() private menus: any;
  activeIndex = this.menus[0].url;
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/public.scss";
.header {
  display: flex;
  align-items: center;
  background-color: $color-4;
  padding: 0 50px;
  background-color: #fff;
  // border-bottom: 1px solid $color-1;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
}
.title {
  margin-right: 20px;
  font-weight: 600;
}
/deep/ .el-menu {
  padding: 0 15px;
  &.el-menu--horizontal {
    border-bottom: 0;
  }
}
</style>