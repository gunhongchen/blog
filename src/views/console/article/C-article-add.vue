<template>
  <div class="c-article-add">
      <Title :title="'添加文章'" backurl="/console/article"></Title>
      <div class="article-content p-20">
        <el-card class="box-card">
          <ArticleForm @submit="submit" :isLoading="isLoading" :article="article"></ArticleForm>
        </el-card>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import ArticleForm from './components/Article-form.vue';
import * as articleHttp from '../../../http/api/article';
import { Message } from 'element-ui'

@Component({
  components: {
      Title,
      ArticleForm
  },
})
export default class CArticleAdd extends Vue {
  article = {};
  isLoading: boolean = false;
  submit(v) {
    this.isLoading = true;
    articleHttp.addData({content: v.content, title: v.title, tag: v.tag, codeHtml: v.codeHtml}).then((res) => {
      Message.success('添加成功')
      this.$router.push({path: '/console/article'})
      this.isLoading = false;
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
    
</style>