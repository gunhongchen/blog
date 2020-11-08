<template>
  <div class="album-tree-single">
    <div class="overflow-hidden mb-20">
      <div class="float-left">
        <div class="inline-block" v-if="fileData.type == 'FOLDER'">
          <i
            class="el-icon-folder color-3 cursor-pointer"
            v-if="opened.indexOf(fileData._id) == -1"
            @click="openFolder(fileData)"
          ></i>
          <i
            class="el-icon-folder-opened color-3 cursor-pointer"
            v-if="opened.indexOf(fileData._id) > -1"
            @click="closeFolder(fileData)"
          ></i>
        </div>
        <div class="inline-block" v-if="fileData.type == 'FILE'">
          <!-- <i class="el-icon-picture-outline color-3"></i> -->
          <img :src="fileData.imgUrl" alt="" />
        </div>
        <div class="inline-block ml-20 size-size-stitle color-2">
          <p class="mb-10">{{ fileData.name }}</p>
          <p>{{ fileData.createdTime | date }}</p>
        </div>
      </div>
      <div class="float-right">
        <el-popconfirm title="确定删除吗？" @onConfirm="deleteData(fileData)">
          <template #reference>
            <i class="el-icon-delete size-main color-danger cursor-pointer"></i>
          </template>
        </el-popconfirm>
        <el-divider direction="vertical"></el-divider>
        <i
          class="el-icon-edit color-3 size-main cursor-pointer"
          @click="showAddModal(fileData, 1)"
        ></i>
        <template v-if="fileData.type == 'FOLDER'">
          <el-divider direction="vertical"></el-divider>
          <i
            class="el-icon-plus color-3 size-main cursor-pointer"
            @click="showAddModal(fileData)"
          ></i>
          <el-divider direction="vertical"></el-divider>
          <i
            class="el-icon-arrow-down color-3 size-main cursor-pointer"
            v-if="opened.indexOf(fileData._id) == -1"
            @click="openFolder(fileData)"
          ></i>
          <i
            class="el-icon-arrow-up color-3 size-main cursor-pointer"
            v-if="opened.indexOf(fileData._id) > -1"
            @click="closeFolder(fileData)"
          ></i>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import { Album } from "./Album";
import * as albumHttp from "../../../../http/api/console/album";
import { Message } from "element-ui";

@Component({
  components: {},
})
export default class AlbumTreeSingle extends Vue {
  @Prop() fileData;
  @Prop() opened;
  @Emit() openedfolder(v) {}
  @Emit() closedfolder(v) {}
  @Emit() delete(v) {}
  @Emit() showmodal(v, index) {}

  openFolder(v) {
    this.openedfolder(v);
  }

  closeFolder(v) {
    this.closedfolder(v);
  }

  showAddModal(item, isEdit?) {
    this.showmodal(item, isEdit);
  }

  deleteData(v) {
    this.delete(v);
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/public.scss";
i {
  font-size: 50px;
}

img {
  width: 50px;
  height: 50px;
}
</style>