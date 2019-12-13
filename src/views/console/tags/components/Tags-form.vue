<template>
  <div class="tags-form">
      <el-form ref="form" :model="form" :label-position="'right'" label-width="100px" @submit.native.prevent>
        <el-row :gutter="24">
          <el-col :span="20" :offset="2">
            <el-form-item label="标签名称">
              <el-input v-model="form.name" @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="isloading">保存</el-button>
              <router-link to="/console/tags">
                <el-button>取消</el-button>
              </router-link>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Message } from 'element-ui';

@Component({
  components: {},
})
export default class TagForm extends Vue {
    @Prop() private tag;
    @Emit() submit(n: string){ }
    @Prop() isloading!: boolean;
    form= this.tag || {name: ''};
    onSubmit() {
      if(!this.form.name){
        Message.error('请输入标签名称')
        return;
      }
      this.submit(this.form)
    }
}
</script>

<style lang="scss" scoped>
  .tags-form{
    width:100%;
  }
  /deep/ {
    .el-input{
      max-width: 80%;
    }
    .el-button.el-button--primary{
      margin-right:15px;
    }
  }
</style>