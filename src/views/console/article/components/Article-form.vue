<template>
  <div class="article-form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-position="'right'"
      label-width="100px"
    >
      <el-row :gutter="24">
        <el-col :span="20" :offset="2">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="cover">
            <el-input v-model="form.cover"></el-input>
          </el-form-item>
          <el-form-item label="简述" prop="description">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <mavon-editor
              ref="md"
              v-model="form.content"
              :tabSize="4"
              :toolbars="toolbars"
              @imgAdd="imgAdd"
              @change="mChange"
            />
          </el-form-item>
          <el-form-item label="标签" prop="tag">
            <el-select v-model="form.tag" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否发布" prop="publish">
            <el-switch
              v-model="form.publish"
              active-text="是"
              inactive-text="否"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="是否开启评论" prop="canReply">
            <el-switch
              v-model="form.canReply"
              active-text="是"
              inactive-text="否"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="isloading"
              >保存</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { Article } from "./Article";
import * as tagHttp from "../../../../http/api/console/tags";
import * as articleHttp from "../../../../http/api/console/article";
import * as qiniu from "qiniu-js";
import mavonEditor from "mavon-editor";
import * as qiniuHttp from '@/http/api/console/qiniu';

@Component({
  components: {},
})
export default class ArticleForm extends Vue {
  @Prop() article!: Article;
  @Prop() isloading!: boolean;
  @Emit() submit(n: Article) {}
  @Watch("article")
  onArticleChange() {
    this.form = this.article || new Article();
  }
  form = this.article || new Article();
  codeHtml: string = "";
  rules = {
    content: [{ required: true, trigger: "change" }],
    title: [{ required: true, message: "请输入标题", trigger: "change" }],
    tag: [{ required: true, message: "请选择标签", trigger: "blur" }],
    description: [{ required: true, message: "请输入描述内容" }],
  };
  options: [] = [];
  toolbars = {
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    superscript: true, // 上角标
    subscript: true, // 下角标
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    imagelink: false, // 图片链接
    code: true, // code
    table: true, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: true, // 沉浸式阅读
    htmlcode: true, // 展示html源码
    help: true, // 帮助
    /* 1.3.5 */
    undo: true, // 上一步
    redo: true, // 下一步
    trash: true, // 清空
    save: true, // 保存（触发events中的save事件）
    /* 1.4.2 */
    navigation: true, // 导航目录
    /* 2.1.8 */
    alignleft: true, // 左对齐
    aligncenter: true, // 居中
    alignright: true, // 右对齐
    /* 2.2.1 */
    subfield: true, // 单双栏模式
    preview: true, // 预览
  }

  created() {
    tagHttp.getDatas().then((res: any) => {
      this.options = res;
    });
    this.imgcanuse();
  }
  imgcanuse() {
    qiniuHttp.canuse().then((res: any) => {
      this.toolbars.imagelink = res;
    })
  }
  onSubmit() {
    this.form.codeHtml = this.codeHtml;
    this.submit(this.form);
  }
  mChange(v, rander) {
    this.codeHtml = rander;
  }

  // 绑定@imgAdd event
  imgAdd(pos, $file) {
    const that = this;
    articleHttp.uploadImgToken().then((token) => {
      qiniu
        .upload(
          $file,
          $file.name,
          token,
          {
            fname: "",
            params: {},
            mimeType: null,
          },
          {
            useCdnDomain: true,
            disableStatisticsReport: false,
            retryCount: 6,
            region: qiniu.region.z2,
          }
        )
        .subscribe({
          next(res) {},
          error(err) {},
          complete(res) {
            that && that.$refs.md["$img2Url"](pos, res.imgUrl);
          },
        });
    });
  }
}
</script>

<style lang="scss">
/deep/ .el-input {
  max-width: 80%;
}
</style>