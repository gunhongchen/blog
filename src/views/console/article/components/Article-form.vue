<template>
  <div class="article-form">
      <el-form ref="form" :model="form" :rules="rules" :label-position="'right'" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="20" :offset="2">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <mavon-editor v-model="form.content" :tabSize="4"/>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
              <el-select v-model="form.tag" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
                </el-option>
              </el-select>
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
import {Article} from './Article'

@Component({
  components: {},
})
export default class ArticleForm extends Vue {
    @Prop() private article;
    @Prop() isloading!: boolean;
    @Emit() submit(n: Article){ }
    form= this.article || new Article();
    rules= {
        content: [
          {required: true,  trigger: 'change'}
        ],
        title: [
          {required: true, message: '请输入标题', trigger: 'change'}
        ],
        tag: [
          {required: true, message: '请选择标签', trigger: 'blur'}
        ]
    }
    options: [] = [];
    created() {
      this.$http.get(`/api/tag`).then(res => {
        this.options = res.data;
      })
    }
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