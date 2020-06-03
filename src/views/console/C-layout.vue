<template>
  <div class="c-layout">
      <Header :title="title" :menus="menus"></Header>
      <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';

@Component({
  components: { 
    Header
  },
})
export default class CLayout extends Vue {
  title = '管理';
  menus =  [
    {name: '文章管理', url:'/console/article'},
    {name: '图集管理', url:'/console/album'},
    {name: '标签管理', url:'/console/tags'},
    {name: '用户管理', url:'/console/user'},
  ];
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
  .c-layout{
    min-height:100vh;
    background-color:$color-3;
  }
</style>