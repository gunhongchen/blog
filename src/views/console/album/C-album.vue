<template>
    <div class="c-album">
      <Title title="图集管理">
        <template #btn>
          <el-button style="padding: 3px 0" type="text" icon="el-icon-plus" @click="visible=true">添加图片/图集</el-button>
        </template>
      </Title>
      <div class="article-content p-20">
        <el-card class="box-card" v-loading="loading">
          <AlbumTree :fileData="fileData" @deleted="childDeleted"></AlbumTree>
        </el-card>
      </div>
      <el-dialog 
        title="添加图片/图集" 
        :visible.sync="visible" 
        :destroy-on-close="true" 
        :close-on-click-modal="false">
        <AlbumForm @submit="submit"></AlbumForm>
      </el-dialog>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import AlbumTree from './components/album-tree.vue';
import AlbumForm from './components/album-form.vue';
import * as albumHttp from '../../../http/api/console/album';
import {Message} from 'element-ui';
import {Album} from './components/Album';

@Component({
  components: {
    Title,
    AlbumTree,
    AlbumForm
  },
})
export default class CAlbum extends Vue {
  loading = false;
  visible = false;
  submit(v) {
    v.parentId = 0;
    albumHttp.addAlbum(v).then(res => {
      this.getAlbum(0);
      Message.success('添加成功');
      this.visible = false;
    })
  }
  fileData: Array<Album> = [];
  created() {
    this.getAlbum(0);
  }

  getAlbum(id) {
    albumHttp.getAlbum(id).then((res: any) => {
      this.fileData = res;
    })
  }

  childDeleted(v,index){
    this.fileData.splice(index,1);
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
</style>
