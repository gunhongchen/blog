<template>
  <div class="header">
      <div class="title size-main color-2">
          {{title}}
      </div>
      <div class="menu">
        <el-menu :default-active="activeIndex" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item v-for="(item, index) in menus" :key="index" :index="item.url">{{item.name}}</el-menu-item>
          <!-- <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu> -->
        </el-menu>
        <div class="line"></div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Header extends Vue {
  @Prop() private title!: string;
  @Prop() private menus: any;
  activeIndex = '1';
  handleSelect(key, keyPath) {
    console.log(key, keyPath);
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/public.scss';
    .header{
      display:flex;
      align-items: center;
      padding:10px 50px;
      background-color: $color-4;
    }
    .title{
      margin-right: 20px;
    }
    /deep/ .el-menu{
      padding: 0 15px;
    }
    
</style>