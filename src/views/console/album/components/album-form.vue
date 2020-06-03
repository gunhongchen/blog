<template>
    <div class="album-form">
        <el-form ref="albumform" :rules="rules" :model="form" :label-position="'right'" label-width="100px" @submit.native.prevent>
            <el-row :gutter="24">
                <el-col :span="20" :offset="2">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="文件类型" prop="type">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option :key="'FOLDER'" :label="'图集'" value="FOLDER"></el-option>
                            <el-option :key="'FILE'" :label="'图片'" value="FILE"></el-option>
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
                            inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="imgs" v-if="form.type=='FILE'">
                        <Upload :multiple="true" :fileList.sync="fileList"></Upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import {Album} from './Album';
import Upload from '@/components/Upload.vue';
import { Message } from 'element-ui';

@Component({
  components: {
      Upload
  },
})
export default class AlbumForm extends Vue {
    @Prop() album;
    @Prop() loading;
    @Emit() submit(v) {};
    @Watch('album')
    albumChange() {
        this.form = this.album || new Album();
    }
    form = this.album || new Album();
    rules = {
      name: [
        {required: true, message:'名称必填', trigger: 'change'}
      ]
    };
    fileList = [];
    onSubmit() {
        if(this.form.type=='FILE' && this.fileList.length < 1) {
            Message.error('请上传图片');
            return;
        }
        this.form.fileList = this.fileList;
        console.log(this.form);
        // this.submit(this.form);
    }
    cancel() {
        this.$parent.$parent['visible'] = false;
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/styles/public.scss';
/deep/{
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>
