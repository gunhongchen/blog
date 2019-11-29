<template>
  <div class="c-article">
      <Title :title="'文章管理'"></Title>
      <div class="article-content p-20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>列表</span>
            <router-link to="/console/article/add">
              <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-plus" >添加文章</el-button>
            </router-link>
          </div>
          <Table :table-data="tableData" :columns="columns">
            <template  #operation="data">
              <el-popover
                ref="popover"
                placement="top"
                width="160"
                :value="isvisible">
                <p>这是一段内容这是一段内容确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="isvisible=false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteData(data)">确定</el-button>
                </div>
              </el-popover>
              <el-button type="text" v-popover:popover>删除</el-button>
            </template>
          </Table>
        </el-card>
      </div>
      
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import {Article} from './components/Article';
import Table from '@/components/Table.vue';
@Component({
  components: {
    Title,
    Table
  },
})
export default class CArticle extends Vue {
  tableData: Array<Article> = [];
  columns = [
    {label: '标题', prop: 'title'},
    {label: '日期', prop: 'createTime'},
    {label: '标签', prop: 'tag'},
    {label: '操作', tpl: 'operation'},
  ];
  isvisible:boolean = false;
  created() {
    this.getData();
  }

  getData() {
    this.$http.get('/api/article').then(res => {
      console.log(res);
      this.tableData = res.data;
    })
  }
  deleteData(data) {
    console.log(this.isvisible)
    console.log(data);
    this.isvisible = false;
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
  /deep/ .el-table .warning-row {
    background: oldlace;
  }

  /deep/ .el-table .success-row {
    background: #f0f9eb;
  }
  
</style>