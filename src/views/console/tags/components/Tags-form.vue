<template>
  <div class="tags-form">
      <el-form ref="form" :model="form" :label-position="'right'" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="20" :offset="2">
            <el-form-item label="标签名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="isloading">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class TagForm extends Vue {
    @Prop() private tag;
    @Emit() submit(n: string){ }
    @Prop() isloading: boolean;
    form= this.tag || {name: ''};
    onSubmit() {
      this.submit(this.form)
    }
}
</script>

<style lang="scss">
  /deep/ .el-input{
    max-width: 80%;
  }
</style>