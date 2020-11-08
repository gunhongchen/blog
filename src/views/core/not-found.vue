<template>
  <div class="not-found">
    <div class="page-not-found">
      <div class="box">
        <div class="txt">非常抱歉，您访问的页面不存在！</div>
        <router-link to="/"> 返回首页 </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class NotFound extends Vue {}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/public.scss";
</style>
