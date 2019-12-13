<template>
  <div class="c-article">
      <Title title="文章管理"></Title>
      <div class="article-content p-20">
        <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>列表</span>
            <router-link :to="'/console/article/add'">
              <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-plus" >添加文章</el-button>
            </router-link>
          </div>
          <Table :table-data="tableData" :columns="columns" @load-data="getData">
            <template  #operation="data">
              <el-button type="text" @click="deleted(data)">删除</el-button>
              <el-divider direction="vertical"></el-divider>
              <router-link :to="'/console/article/edit/'+data.data._id">
                <el-button type="text">编辑</el-button>
              </router-link>
            </template>
            <template  #time="data">
              {{data.data.createTime | date()}}
            </template>
            <template #tag="data">
              <el-select v-model="data.data.tag" placeholder="未选择" disabled>
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
                </el-option>
              </el-select>
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
import {MessageBox, Message } from 'element-ui'
import * as articleHttp from '../../../http/api/article';
import * as tagHttp from '../../../http/api/tags';
@Component({
  components: {
    Title,
    Table
  },
})
export default class CArticle extends Vue {
  tableData: any = {};
  columns = [
    {label: '标题', prop: 'title'},
    {label: '日期', tpl: 'time'},
    {label: '标签', tpl: 'tag'},
    {label: '操作', tpl: 'operation'},
  ];
  loading: boolean  = false;
  options: [] = [];
  created() {
    this.getData();
  }

  getData(pagination?) {
    this.loading = true;
    pagination = pagination ? pagination : {
      size: 10,
      currentPage: 1
    }
    articleHttp.getList(pagination).then(res => {
      this.tableData = res;
      if(res.data && res.data.content.length > 0) {
        this.getOptions();
      }
      this.loading = false;
    })
  }
  getOptions() {
    tagHttp.getDatas().then(res => {
      this.options = res.data;
    })
  }
  deleteData(data) {
    this.loading = true;
    const params = {_id: data.data._id}
    articleHttp.deleteData(params).then(res => {
      Message.success('删除成功')
      this.getData();
      this.loading = false;
    })
  }
  deleted(data) {
    MessageBox.confirm('确认删除？')
    .then(_ => {
      this.deleteData(data)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';

  /deep/ {
    .el-table .warning-row {
      background: oldlace;
    }
    .el-table .success-row {
      background: #f0f9eb;
    }
    .el-input__suffix{
      display: none
    }
    .el-input__inner{
      border: 0;
    }
  } 
  
</style>