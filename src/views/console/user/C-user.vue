<template>
    <div class="c-user">
        <Title title="用户管理"></Title>
        <div class="p-20">
            <el-card class="box-card" v-loading="loading">
                <div slot="header" class="clearfix">
                    <span>列表</span>
                    <router-link :to="'/console/user/add'">
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-plus" >添加用户</el-button>
                    </router-link>
                </div>
                <Table :table-data="tableData" :columns="columns" @load-data="getData">
                    <template #operation="data">
                        <el-button type="text" @click="deleted(data)">删除</el-button>
                    </template>
                </Table>
            </el-card>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import Table from '@/components/Table.vue';
import * as userHttp from '../../../http/api/user';
import {MessageBox, Message } from 'element-ui';

@Component({
  components: {Title, Table},
})
export default class CUser extends Vue {
    tableData: any = {};
    columns = [
        {label: '用户名', prop: 'userName'},
        {label: '权限', prop: 'power'},
        {label: '操作', tpl: 'operation'},
    ];
    loading: boolean  = false;

    created() {
        this.getData();
    }

    getData(pagination?) {
        this.loading = true;
        pagination = pagination ? pagination : {
            size: 10,
            currentPage: 1
        }
        userHttp.getUser(pagination).then(res => {
            this.tableData = res;
            this.loading = false;
        })
    }
    deleteData(data) {
        userHttp.deleteUser({_id:data.data._id}).then(res => {
            Message.success('删除成功')
            this.getData();
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
</style>