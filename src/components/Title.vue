<template>
  <div class="title">
      <span>{{title}}</span>
      <div class="route_btn">
          <router-link>
              <el-button style="float: right; padding: 3px 0" type="text" >返回列表</el-button>
          </router-link>
      </div>
      <div class="line"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Title extends Vue {
    @Prop() title!:string;
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/public.scss';
    .title {
        background-color: #fff;
        span{
            display:inline-block;
            box-sizing: border-box;
            color: rgba(0, 0, 0, 0.65);
            font-variant: tabular-nums;
            line-height: 1.5;
            list-style: none;
            font-feature-settings: 'tnum';
            position: relative;
            padding: 16px 24px;
            background: #fff;
            font-weight: bold;
            font-size: 16px;
            line-height: 1.4;
        }
        .line{
            height:1px;
            background-color:$color-4;
            box-shadow: 0 3px 3px $color-4;
        }
    }
</style>