<template>
    <div class="c-album">
      <Title title="图集管理">
        <template #btn>
          <el-button style="padding: 3px 0" type="text" icon="el-icon-plus" @click="visible=true">添加图片/图集</el-button>
        </template>
      </Title>
      <div class="article-content p-20">
        <el-card class="box-card" v-loading="loading">
          <AlbumTree :fileData="fileData"></AlbumTree>
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
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import AlbumTree from './components/album-tree.vue';
import AlbumForm from './components/album-form.vue';
import * as albumHttp from '../../../http/api/console/album';
import {Message} from 'element-ui';

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
    albumHttp.addAlbum(v).then(res => {
      Message.success('添加成功');
    })
  }
  fileData = [
        {
            _id: '11',
            type: 'FOLDER',
            name: '图集1',
            createTime: new Date().getTime(),
            publish: true,
            children: [
                {
                    _id: '1s1',
                    type: 'FILE',
                    name: '文件1-11',
                    createTime: new Date().getTime(),
                    publish: true
                },
                {
                    _id: '1s1a',
                    type: 'FOLDER',
                    name: '图集1-1',
                    createTime: new Date().getTime(),
                    publish: true,
                    children: [
                        {
                            _id: '1s1d',
                            type: 'FILE',
                            name: '文件1-1-11',
                            createTime: new Date().getTime(),
                            publish: true
                        }
                    ]
                }
            ]
        },
        {
            _id: '1s1e',
            type: 'FILE',
            name: '文件11',
            createTime: new Date().getTime(),
            publish: true
        }
    ];

}
</script>
<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
</style>
