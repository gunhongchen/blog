<template>
    <div class="thirdparty-qiniu">
        <Title title="七牛"></Title>
        <div class="p-20">
            <el-card class="box-card" v-loading="isLoading">
                <div slot="header" class="clearfix">
                    <span>相关配置</span>
                </div>
                <el-form ref="form" :model="form" :rules="rules" :label-position="'right'" label-width="150px">
                    <el-row :gutter="24">
                        <el-col :span="20" :offset="2">
                            <el-form-item label="accessKey" prop="accessKey">
                                <el-input v-model="form.accessKey"></el-input>
                            </el-form-item>
                            <el-form-item label="secretKey" prop="secretKey">
                                <el-input v-model="form.secretKey"></el-input>
                            </el-form-item>
                            <el-form-item label="图册图集地址" prop="albumUrl">
                                <el-input v-model="form.albumUrl"></el-input>
                            </el-form-item>
                            <el-form-item label="博客图集地址" prop="blogUrl">
                                <el-input v-model="form.blogUrl"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" :loading="isLoading">保存</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import Title from "@/components/Title.vue";
    import * as qiniuHttp from '@/http/api/console/qiniu';
    import { Message } from "element-ui";

    @Component({
        components: { Title},
    })
    export default class ThirdpartyQiniu extends Vue { 
        isLoading: boolean = false;
        form = {
            accessKey: '',
            secretKey: '',
            albumUrl: '',
            blogUrl: ''
        };
        rules = {
            accessKey: [{ required: true, message: "请输入accessKey", trigger: "change" }],
            secretKey: [{ required: true, message: "请输入secretKey", trigger: "change" }],
            albumUrl: [{ required: true, message: "请输入画册图集七牛地址", trigger: "change" }],
            blogUrl: [{ required: true, message: "请输入博客图集七牛地址", trigger: "change" }],
        };

        created() {
            this.getInfo();
        }

        getInfo() {
            this.isLoading = true;
            qiniuHttp.getInfo().then(res => {
                this.form = res;
                this.isLoading = false;
            })
        }

        onSubmit() {
            this.isLoading = true;
            if(this.form._id) {
                qiniuHttp.putInfo(this.form).then(res => {
                    Message.success("修改成功");
                    this.getInfo();
                    this.isLoading = false;
                })
                return;
            }
            qiniuHttp.setInfo(this.form).then(res => {
                Message.success("添加成功");
                this.getInfo();
                this.isLoading = false;
            })
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../assets/styles/public.scss";
</style>