<template>
  <div class="m-layout">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class MLayout extends Vue { }
</script>
<style lang="scss" scoped>
</style>