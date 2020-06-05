<template>
    <div class="album-tree" v-loading="loading">
        <div v-for="(item, index) in fileData" :key="item._id">
            <div class="overflow-hidden mb-20">
                <div class="float-left">
                    <div class="inline-block" v-if="item.type=='FOLDER'">
                        <i class="el-icon-folder color-3 cursor-pointer" v-if="opened.indexOf(item._id)==-1"></i>
                        <i class="el-icon-folder-opened color-3 cursor-pointer" v-if="opened.indexOf(item._id)>-1"></i>
                    </div>
                    <div class="inline-block" v-if="item.type=='FILE'">
                        <!-- <i class="el-icon-picture-outline color-3"></i> -->
                        <img :src="item.imgUrl" alt="">
                    </div>
                    <div class="inline-block ml-20 size-size-stitle color-2">
                        <p class="mb-10">{{item.name}}</p>
                        <p>{{item.createdTime | date}}</p>
                    </div>
                </div>
                <div class="float-right">
                    <el-popconfirm
                        title="确定删除吗？"
                        @onConfirm="deleteData(item,index)"
                        >
                        <template #reference>
                            <i class="el-icon-delete size-main color-danger cursor-pointer"></i>
                        </template>
                    </el-popconfirm>
                    <el-divider direction="vertical"></el-divider>
                    <i 
                        class="el-icon-edit color-3 size-main cursor-pointer"
                        @click="showAddModal(item,1)"></i>
                    <template v-if="item.type=='FOLDER'">
                        <el-divider direction="vertical"></el-divider>
                        <i 
                            class="el-icon-plus color-3 size-main cursor-pointer" 
                            @click="showAddModal(item)"></i>
                        <el-divider direction="vertical"></el-divider>
                        <i 
                            class="el-icon-arrow-down color-3 size-main cursor-pointer" 
                            v-if="opened.indexOf(item._id)==-1" 
                            @click="openFolder(item)"></i>
                        <i 
                            class="el-icon-arrow-up color-3 size-main cursor-pointer" 
                            v-if="opened.indexOf(item._id)>-1"
                            @click="closeFolder(item)"></i>
                    </template>
                </div>
            </div>
            <div class="folder-children" v-if="item.type=='FOLDER'&&item.children&&item.children.length>0&&opened.indexOf(item._id)>-1">
                <AlbumTree :fileData="item.children" @deleted="childDeleted"></AlbumTree>
            </div>
        </div>
        <div class="text-center" v-if="fileData.length < 1">
            暂无数据
        </div>
        <el-dialog 
            title="添加图片/图集" 
            @closed="modalClosed"
            :visible.sync="visible" 
            :destroy-on-close="true" 
            :close-on-click-modal="false">
            <AlbumForm @submit="submit" :album="editdata"></AlbumForm>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import {Album} from './Album';
import AlbumForm from './album-form.vue';
import * as albumHttp from '../../../../http/api/console/album';
import { Message } from 'element-ui';

@Component({
  components: {
      AlbumForm
  },
})
export default class AlbumTree extends Vue {
    opened: Array<any> = [];
    visible: boolean = false;
    currentFolder: Album = {};
    loading: boolean = false;
    editdata: Album | null = null;
    @Prop() fileData;
    @Emit() deleted(v,index){};
    treeFileData = this.fileData;
    deleteData(v, index) {
        if(v.childCount>0) {
            Message.warning('该文件夹下包含其他文件，不支持删除');
            return;
        }
        this.loading = true;
        albumHttp.deleteAlbum(v._id).then(res => {
            this.deleted(v,index);
            Message.success('删除成功');
            this.loading = false;
        })
    }
    childDeleted(v,index){
        this.fileData.find(f=> {
            return f._id==v.parentId;
        }).children.splice(index,1).childCount=0;
    }
    showAddModal(item,isEdit?) {
        if(isEdit){
            this.editdata = item;
        }
        this.currentFolder = item;
        this.visible = true;
    }
    modalClosed() {
        this.currentFolder = {};
        this.editdata = null;
    }
    getAlbum(id) {
        this.loading = true;
        albumHttp.getAlbum(id).then((res: any) => {
            if(this.currentFolder._id){
                this.currentFolder['children'] = res;
                this.currentFolder = {};
            }
            this.$emit('update:fileData', this.treeFileData)
            this.loading = false;
        })
    }
    submit(v,isEdit) {
        if(isEdit) {
            albumHttp.editAlbum(v).then(res => {
                v=res;
                Message.success('编辑成功');
                this.visible = false;
            });
            return;
        }
        v.parentId = this.currentFolder._id;
        albumHttp.addAlbum(v).then(res => {
            if(this.opened.indexOf(this.currentFolder._id)<0){
                this.opened.push(this.currentFolder._id);
            }
            this.getAlbum(this.currentFolder._id);
            Message.success('添加成功');
            this.visible = false;
        })
    }
    openFolder(v) {
        this.opened.push(v._id);
        if(v.childCount<1){
            return;
        }
        this.currentFolder = v;
        this.getAlbum(v._id);
    }
    closeFolder(v) {
        this.opened.splice(this.opened.indexOf(v._id),1);
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/styles/public.scss';
i{
    font-size: 50px;
}
.folder-children{
    margin-left: 50px;
}
img{
    width: 50px;
    height: 50px;
}
</style>
