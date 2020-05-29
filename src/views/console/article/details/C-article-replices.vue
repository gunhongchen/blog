<template>
    <div class="c-article-replices">
        <Title :title="'讨论列表'"></Title>
        <div class="p-20">
          <el-card class="box-card" v-loading="loading">
            
          </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';

@Component({
  components: {
    Title
  },
})
export default class CArticleReplices extends Vue {
  loading: boolean = false;
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/public.scss';
    
</style>