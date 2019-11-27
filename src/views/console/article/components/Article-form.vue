<template>
  <div class="article-form">
      <el-form ref="form" :model="form" :label-position="'right'" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="20" :offset="2">
            <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <mavon-editor v-model="form.content" :tabSize="4"/>
            </el-form-item>
            <el-form-item label="标签">
              <el-select v-model="form.tag" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import {Article} from './Article'

@Component({
  components: {},
})
export default class ArticleForm extends Vue {
    @Prop() private article;
    isloading: boolean = false;
    form= this.article || new Article();
    options = [{
      value: '1',
      label: '黄金糕'
    }, {
      value: '2',
      label: '双皮奶'
    }, {
      value: '3',
      label: '蚵仔煎'
    }, {
      value: '4',
      label: '龙须面'
    }, {
      value: '5',
      label: '北京烤鸭' 
    }]
    onSubmit() {
      this.isloading = true;
      const _that = this;
      this.$http.post('/api/article', {content: this.form.content, title: this.form.title, tag: this.form.tag}).then((v) => {
        console.log(v)
        _that.isloading = false;
      })
    }
}
</script>

<style lang="scss">
  /deep/ .el-input{
    max-width: 80%;
  }
</style>