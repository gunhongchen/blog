<template>
  <div class="layout">
    <Header :title="title" :menus="menus"></Header>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header,
  },
})
export default class Layout extends Vue {
  title = "Home";
  menus = [
    {
      name: "首页",
      url: "/",
    },
    {
      name: "日志",
      url: "/article",
    },
    {
      name: "图集",
      url: "/album",
    },
  ];
}
</script>
<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}
</style>
