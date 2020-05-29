<template>
  <div class="c-tags-add">
      <Title :title="'添加标签'" backurl="/console/tags"></Title>
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
import { Message } from 'element-ui';
import * as tagHttp from '../../../http/api/console/tags';

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
    tagHttp.addData({name: v.name}).then(res => {
      this.$router.push({path: '/console/tags'})
      this.isloading = false;
    }).catch(err => {
      Message({
        message: err.response.data,
        type: 'error'
      })
      this.isloading = false;
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
    
</style>