<template>
  <div class="c-tags-add">
      <Title :title="'添加标签'"></Title>
      <div class="article-content p-20">
        <el-card class="box-card">
          <TagForm :isloading="isloading" @submit="onSubmit"></TagForm>
        </el-card>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import TagForm from './components/Tags-form.vue';

@Component({
  components: {
      Title,
      TagForm
  },
})
export default class CTagsAdd extends Vue {
  isloading: boolean = false;
  onSubmit(v) {
    this.isloading = true;
    this.$http.post(`/api/tag`, {name: v.name}).then(res => {
      console.log(res)
      this.isloading = false;
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
    
</style>