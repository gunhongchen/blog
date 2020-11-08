<template>
  <div class="article-detail">
    <div class="detail-container" v-loading="loading">
      <div class="detail-head">
        <p class="title color-1 mb-10">{{ article.title }}</p>
        <p>
          <span>{{ article.createTime | date("yyyy-MM-dd") }}</span>
          <span class="ml-10">·</span>
          <span class="ml-10">大约需要{{ article.spentTime }}分钟阅读</span>
        </p>
      </div>
      <mavon-editor
        v-model="article.content"
        previewBackground="#fff"
        :boxShadow="false"
        :toolbarsFlag="false"
        :subfield="false"
        defaultOpen="preview"
      />
      <template v-if="article.canReply">
        <div>
          <span>评论回复</span>
          <span class="ml-10 color-2"
            >共{{ article.commentCount || 0 }}条评论</span
          >
        </div>
        <div class="replices">
          <ReplicesTemplate
            @submit="replySubmit"
            :loading="btnLoading"
          ></ReplicesTemplate>
          <ReplicesList
            :currentProject="article"
            :isReplied="isReplied"
          ></ReplicesList>
        </div>
      </template>
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
import { Message } from "element-ui";

@Component({
  components: {
    ReplicesTemplate,
    ReplicesList,
  },
})
export default class ArticleDetail extends Vue {
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
      Message.success("评论成功");
      this.getData(this.$route.params.id);
      this.isReplied = !this.isReplied;
      this.btnLoading = false;
    });
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/public.scss";
.article-detail {
  padding-top: 20px;
}
.detail-container {
  width: 80%;
  margin: 0 auto;
  .detail-head {
    text-align: center;
    .title {
      font-size: 2.5em;
      font-weight: 600;
    }
    & p:nth-of-type(2) {
      color: #777;
      font-size: 1.2rem;
    }
  }
}
.replices {
  width: 70%;
}
/deep/ {
  .v-note-wrapper.markdown-body {
    border: 0;
  }
}
</style>