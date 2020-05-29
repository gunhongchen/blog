<template>
  <div class="replices-tpl">
      <div class="content">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入评论内容"
          v-model="textarea">
        </el-input>
        <div class="btn">
          <el-button :loading="loading" type="primary" @click="submit(textarea)">发表评论</el-button>
          <el-button @click="close">取消</el-button>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ReplicesTemplate extends Vue {
  @Prop() loading = false;
  @Emit() close() {
    this.textarea = '';
  };
  @Emit() submit(v: string) {};
  textarea = '';
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
.replices-tpl{
  padding-bottom: 20px;
}
.content,
.btn{
  margin-top: 20px;
}
</style>