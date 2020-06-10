<template>
  <div class="home  color-2">
      <el-row :gutter="10" :type="'flex'" :justify="'center'">
        <el-col :span="22">
          <p class="navitem mb-10" v-for="(item,i) of homeNav" :key="i">
            <template v-if="item.url">
              <router-link :to="item.url" class="color-link size-title">
                {{item.name}}
              </router-link>
            </template>
            <template v-else>
              <span class="size-title color-2">{{item.name}}</span>
            </template>
          </p>
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
    {name: '我思故我在'},
    {name: 'album', url: '/album'},
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
  .nav-item{
  }
  .nav{
    background-color:rgba(200,200,200,.5);
  }
</style>
