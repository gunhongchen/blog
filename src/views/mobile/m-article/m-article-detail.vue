<template>
  <div class="m-article-detail">
    <van-sticky z-index="1502">
      <div class="shadow z-10">
        <van-nav-bar :title="article.title" left-text="返回" left-arrow @click-left="onClickLeft"/>
      </div>
    </van-sticky>
    <div class="detail-container p-4 pb-10" v-loading="loading">
      <div class="detail-head mb-4 border-b">
        <p class="text-center text-3xl font-bold mb-2">{{ article.title }}</p>
        <p class="text-center text-gray-500">
          <span>{{ article.createTime | date("yyyy-MM-dd") }}</span>
          <span class="mx-2">·</span>
          <span>大约需要{{ article.spentTime }}分钟阅读</span>
        </p>
      </div>
      <mavon-editor v-model="article.content" previewBackground="#fff" :boxShadow="false" :toolbarsFlag="false"
        :subfield="false" defaultOpen="preview" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as articleHttp from "../../../http/api/client/article";
import * as replyHttp from "../../../http/api/client/reply";
import { Article } from "../../console/article/components/Article";
import ReplicesTemplate from "@/components/replices/Replices.vue";
import ReplicesList from "@/components/replices/ReplicesList.vue";

@Component({
  components: {
    ReplicesTemplate,
    ReplicesList,
  },
})
export default class MArticleDetail extends Vue {
  loading: boolean = false;
  btnLoading: boolean = false;
  article: Article = {};
  articleReplices = [];
  isReplied = false;
  mounted() {
    this.getData(this.$route.params.id);
  }

  getData(id) {
    this.loading = true;
    articleHttp.getOne(id).then((res: any) => {
      this.article = res;
      this.article["spentTime"] =
        res.content.length / 350 > 1 ? Math.round(res.content.length / 400) : 1;
      this.loading = false;
    });
  }
  replySubmit(v) {
    this.btnLoading = true;
    replyHttp.comment(this.$route.params.id, v).then((res) => {
      this.getData(this.$route.params.id);
      this.isReplied = !this.isReplied;
      this.btnLoading = false;
    });
  }
  onClickLeft() {
    this.$router.go(-1);
  }
}
</script>
<style lang="scss" scoped>
  /deep/ {
    .v-note-wrapper{
      border: none;
    }
    .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html{
      padding: .5rem;
    }
  }
</style>