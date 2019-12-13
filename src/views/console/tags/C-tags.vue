<template>
  <div class="c-tags">
      <Title title="标签管理"></Title>
      <div class="p-20">
        <el-card class="box-card" v-loading="isLoading">
            <div slot="header" class="clearfix">
                <span>列表</span>
                <router-link to="/console/tags/add">
                    <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-plus" >添加标签</el-button>
                </router-link>
            </div>
            <el-card class="box-card-content" v-for="(item, index) in tags" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="deleteTag(item)"></el-button>
                </div>
            </el-card>
        </el-card>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import { Message } from 'element-ui';
import * as tagHttp from '../../../http/api/tags';
import { AxiosResponse } from 'axios';

@Component({
  components: {
      Title
  },
})
export default class CTags extends Vue {
    isLoading: boolean = false;
    tags: any = [];
    getData() {
        this.isLoading = true;
        tagHttp.getDatas().then(res => {
            this.tags = res;
            this.isLoading = false;
        })
    }
    created() {
        this.getData();
    }
    deleteTag(item) {
        this.isLoading = true;
        const params = {_id: item._id}
        tagHttp.deleteData(params).then(res => {
            Message.success('删除成功');
            this.getData();
        })
    }
    
}
</script>

<style lang="scss" scoped>
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