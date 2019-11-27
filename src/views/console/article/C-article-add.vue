<template>
  <div class="c-article-add">
      <Title :title="'添加文章'"></Title>
      <div class="article-content p-20">
        <el-card class="box-card">
          <ArticleForm></ArticleForm>
        </el-card>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import ArticleForm from './components/Article-form';

@Component({
  components: {
      Title,
      ArticleForm
  },
})
export default class CArticleAdd extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
    
</style>