<template>
  <div class="c-article-add">
      <Title :title="'添加文章'"></Title>
      <div class="article-content p-20">
        <el-card class="box-card">
          <ArticleForm @submit="submit" isLoading="isLoading"></ArticleForm>
        </el-card>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import ArticleForm from './components/Article-form.vue';

@Component({
  components: {
      Title,
      ArticleForm
  },
})
export default class CArticleAdd extends Vue {
  isLoading: boolean = false;
  submit(v) {
    this.isLoading = true;
    this.$http.post('/api/article', {content: v.content, title: v.title, tag: v.tag}).then((v) => {
      this.$router.push({path: '/console/article'})
      this.isLoading = false;
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
    
</style>