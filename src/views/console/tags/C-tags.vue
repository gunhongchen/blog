<template>
  <div class="c-tags">
      <Title :title="'标签管理'"></Title>
      <div class="article-content p-20">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>列表</span>
                <router-link to="/console/tags/add">
                    <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-plus" >添加标签</el-button>
                </router-link>
            </div>
            <el-card class="box-card-content" v-for="(item, index) in cardData" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close"></el-button>
                </div>
            </el-card>
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
export default class CTags extends Vue {
    data() {
        return {
            cardData: [{
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
}
</script>

<style lang="scss">
    @import '../../../assets/styles/public.scss';
    .box-card{
        /deep/ .el-card__body{
            display:flex;
        }
    }
    .box-card-content{
        width:150px;
        margin-right: 20px;
        /deep/ .el-card__body{
            display:none;
        }
    }
</style>