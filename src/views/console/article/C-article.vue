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
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';

@Component({
  components: {
    Title
  },
})
export default class CArticle extends Vue {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }

  tableRowClassName({row, rowIndex}) {
    if (rowIndex%2 === 1) {
      return 'success-row';
    }
    return '';
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