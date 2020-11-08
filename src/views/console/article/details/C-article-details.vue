<template>
  <div class="c-article-details">
    <Title title="文章详情"></Title>
    <div class="container">
      <div class="side">
        <el-menu
          router
          :default-active="'/console/article/' + articleID"
          class="el-menu-vertical-demo"
        >
          <el-menu-item key="0" :index="'/console/article/' + articleID">
            <span slot="title">文章信息</span>
          </el-menu-item>
          <el-menu-item
            key="1"
            :index="'/console/article/' + articleID + '/replices'"
          >
            <span slot="title">讨论管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Title from "@/components/Title.vue";

@Component({
  components: {
    Title,
  },
})
export default class CArticleDetails extends Vue {
  articleID;
  created() {
    this.articleID = this.$route.params.id;
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/public.scss";
.container {
  display: flex;
  height: calc(100vh - 120px);
}
.side {
  height: 100%;
}
.main {
  flex-grow: 1;
  overflow-y: auto;
}
/deep/ {
  .el-menu {
    height: 100%;
    width: 200px;
  }
}
</style>