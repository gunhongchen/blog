<template>
  <div class="home  color-2">
      <el-row :gutter="10" :type="'flex'" :justify="'center'">
        <el-col :span="22">
          <p>我思故我在</p>
          <span v-for="(item,i) of homeNav" :key="i">
            <router-link :to="item.url" class="navitem">
              {{item.name}}
            </router-link>
          </span>
        </el-col>
      </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {
  homeNav: Array<{}> = [
    {name: 'article', url: '/article'},
    {name: 'article', url: '/article'},
    {name: 'article', url: '/article'},
  ]
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
  .home{
    position:relative;
    top:50%;
    transform: translateY(-50%);
    text-align: center;
  }
  .navitem{
    color:$color-link;
  }
  .nav{
    background-color:rgba(200,200,200,.5);
  }
</style>
