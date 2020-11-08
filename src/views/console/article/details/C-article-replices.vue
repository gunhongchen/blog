<template>
  <div class="c-article-replices">
    <Title :title="'讨论列表'"></Title>
    <div class="p-20">
      <el-card class="box-card" v-loading="loading">
        <template v-if="article && article.commentCount > 0">
          <ReplicesList
            :currentProject="article"
            :isReplied="isReplied"
            :isConsole="true"
          ></ReplicesList>
        </template>
        <template v-else>
          <p class="text-center color-2">暂无数据</p>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Title from "@/components/Title.vue";
import Table from "@/components/Table.vue";
import ReplicesList from "@/components/replices/ReplicesList.vue";
import * as articleHttp from "../../../../http/api/console/article";
import { Article } from "../../../console/article/components/Article";

@Component({
  components: {
    Title,
    Table,
    ReplicesList,
  },
})
export default class CArticleReplices extends Vue {
  loading: boolean = false;
  article: Article = {};
  isReplied = false;
  created() {
    this.getData(this.$parent.$route.params.id);
  }

  getData(id) {
    this.loading = true;
    articleHttp.getOne(id).then((res: any) => {
      this.article = res;
      this.loading = false;
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/public.scss";
</style>