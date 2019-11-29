<template>
  <div class="c-tags">
      <Title :title="'标签管理'"></Title>
      <div class="article-content p-20">
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

@Component({
  components: {
      Title
  },
})
export default class CTags extends Vue {
    api = `/api/tag`;
    isLoading: boolean = false;
    tags: [] = []
    getData() {
        this.isLoading = true;
        this.$http.get(`/api/tag`).then(res => {
             this.tags = res.data;
            this.isLoading = false;
        })
    }
    created() {
        this.getData();
    }
    deleteTag(item) {
        this.isLoading = true;
        const params = {_id: item._id}
        this.$http.delete(this.api, {params}).then(res => {
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