<template>
    <div class="album-trees">
      <div v-for="(item, index) in fileData" :key="item._id">
        <AlbumTreeSingle :fileData="item" :opened="opened" @openedfolder="openFolder" @closedfolder="closeFolder"  @showmodal="showAddModal" @delete="deleteData($event,index)"></AlbumTreeSingle>
        <div class="folder-children" v-if="item.type=='FOLDER'&&item.children&&item.children.length>0&&opened.indexOf(item._id)>-1">
          <div v-for="(child, childIndex) in item.children" :key="child._id">
            <AlbumTreeSingle :fileData="child"  :opened="opened" @openedfolder="openFolder" @closedfolder="closeFolder" @showmodal="showAddModal" @delete="deleteChildData($event,childIndex,1)"></AlbumTreeSingle>
          </div>
        </div>
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AlbumTreeSingle from './album-tree-single.vue';
import {Album} from './Album';
import AlbumForm from './album-form.vue';
import * as albumHttp from '../../../../http/api/console/album';
import { Message } from 'element-ui';

@Component({
  components: {
    AlbumTreeSingle,
    AlbumForm
  },
})
export default class AlbumTrees extends Vue {
  @Prop() fileData;
    
  loading: boolean = false;
  visible: boolean = false;
  opened: Array<any> = [];
  currentFolder: Album = {};
  editdata: Album | null = null;

  openFolder(v) {
        this.opened.push(v._id);
        if(v.childCount<1){
            return;
        }
        this.currentFolder = v;
        this.getAlbum(v);
    }

    closeFolder(v) {
        this.opened.splice(this.opened.indexOf(v._id),1);
    }

    getAlbum(v) {
        this.loading = true;
        albumHttp.getAlbum(v._id).then((res: any) => {
            if(this.currentFolder._id){
                this.currentFolder['children'] = res;
                this.currentFolder = {};
            }
            this.loading = false;
        })
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
            this.openFolder(this.currentFolder);
            Message.success('添加成功');
            this.visible = false;
        })
    }

    deleteData(v,index,isChild) {
        if(v.childCount>0) {
            Message.warning('该文件夹下包含其他文件，不支持删除');
            return;
        }
        this.loading = true;
        albumHttp.deleteAlbum(v._id, v.parentId).then(res => {
            if(isChild) {
                this.fileData.find(f=> {
                    return f._id==v.parentId;
                }).children.splice(index,1).childCount=0;
            } else {
                this.fileData.splice(index,1)
            }
            Message.success('删除成功');
            this.loading = false;
        })
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/styles/public.scss';
.folder-children{
    margin-left: 50px;
}
</style>
