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
                    <i class="el-icon-edit color-3 size-main cursor-pointer"></i>
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
                <AlbumTree :fileData="item.children"></AlbumTree>
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
            <AlbumForm @submit="submit"></AlbumForm>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
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
    @Prop() fileData;
    treeFileData = this.fileData;
    @Watch('treeFileData')
    treeFileDataChange() {
        console.log(111)
        this.$emit('update:fileData', this.treeFileData);
    }
    deleteData(v, index) {
        this.loading = true;
        albumHttp.deleteAlbum(v._id).then(res => {
            this.treeFileData.splice(index, 1);
            Message.success('删除成功');
            this.loading = false;
        })
    }
    showAddModal(item) {
        this.currentFolder = item;
        this.visible = true;
    }
    modalClosed() {
        this.currentFolder = {};
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
    submit(v) {
        v.parentId = this.currentFolder._id;
        albumHttp.addAlbum(v).then(res => {
            this.opened.push(this.currentFolder._id);
            this.getAlbum(this.currentFolder._id);
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
