<template>
  <div class="c-article-edit">
    <Title :title="'文章信息'"></Title>
    <div class="article-content p-20">
      <el-card class="box-card" v-loading="loading">
        <ArticleForm
          @submit="submit"
          :isLoading="isLoading"
          :article="article"
        ></ArticleForm>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Title from "@/components/Title.vue";
import ArticleForm from "../components/Article-form.vue";
import * as articleHttp from "../../../../http/api/console/article";
import { Article } from "../components/Article";
import { Message } from "element-ui";

@Component({
  components: {
    Title,
    ArticleForm,
  },
})
export default class CArticleEdit extends Vue {
  isLoading: boolean = false;
  loading: boolean = false;
  article: Article = new Article();
  mounted() {
    this.getData(this.$route.params.id);
  }
  getData(id) {
    this.loading = true;
    articleHttp.getOne(id).then((res: any) => {
      this.article = res;
      this.loading = false;
    });
  }
  submit(v) {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("_id", v._id);
    formData.append("codeHtml", v.codeHtml);
    formData.append("content", v.content);
    formData.append("title", v.title);
    formData.append("tag", v.tag);
    formData.append("publish", v.publish);
    formData.append("canReply", v.canReply);
    formData.append("cover", v.cover);
    articleHttp.update(formData).then((res) => {
      Message.success("保存成功");
      this.isLoading = false;
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/public.scss";
</style>