<template>
  <div class="album-infinite">
    <div class="album-box mt-10 mb-10">
      <div class="album-single" v-for="item in albums" :key="item._id">
        <div class="img-box">
          <!-- <img :src="item.imgUrl || item.defaultImg || '/images/albums.jpg'" alt=""> -->
          <!-- :lazy="true" -->
          <el-image
            :src="
              item.imgUrl ||
              (item.imgList && item.imgList[0]) ||
              '/images/albums.jpg'
            "
            :preview-src-list="item.imgList"
            :fit="'scale-down'"
          >
          </el-image>
        </div>
        <div class="info">
          <p class="size-title color-4 ml-10">{{ item.name }}</p>
          <p class="color-3 ml-10">
            {{ item.createdTime | date("yyyy-MM-dd") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as albumHttp from "../../../../http/api/client/album";

@Component({
  components: {},
})
export default class AlbumInfinite extends Vue {
  albums: Array<any> = [];
  created() {
    // parentId为0，所有第一级图集
    this.getAlbum(0);
  }
  getAlbum(parentId) {
    albumHttp.getAlbum(parentId).then((res: any) => {
      this.albums = res;
      this.albums.forEach((v) => {
        if (v.childrenList) {
          v.imgList = [];
          v.childrenList.map((value, k) => {
            v.imgList[k] = value.imgUrl;
            return value.imgUrl;
          });
        }
      });
    });
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/public.scss";
.album-box {
  display: flex;
  flex-wrap: wrap;
}
.album-single {
  width: 31%;
  min-height: 150px;
  position: relative;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 5px #eee;
  .img-box {
    height: 200px;
    flex-grow: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    height: 50px;
    width: 100%;
    position: absolute;
    bottom: -50px;
    background-color: rgba(0, 0, 0, 0.2);
    .size-title {
      font-weight: 600;
    }
  }
  &:hover {
    & .info {
      bottom: 0;
    }
  }
}
</style>
