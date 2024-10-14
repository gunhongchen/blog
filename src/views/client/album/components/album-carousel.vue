<template>
  <div class="album-carousel">
    <el-carousel trigger="click" style="max-height: 400px" :autoplay="false">
      <el-carousel-item v-for="item in carousles" :key="item._id">
        <div class="item-box">
          <h3 class="small ellipsis-1">{{ item.description || item.name }}</h3>
          <img :src="item.imgUrl" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as albumHttp from "../../../../http/api/client/album";

@Component({
  components: {},
})
export default class AlbumCarousel extends Vue {
  carousles = [];
  srcList: Array<any> = [];

  created() {
    this.getAlbum();
  }
  getAlbum() {
    albumHttp.getCarousel().then((res: any) => {
      this.carousles = res;
      res.forEach((v) => {
        this.srcList.push(v.imgUrl);
      });
    });
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/public.scss";
::v-deep {
  .item-box {
    position: relative;
    width: 100%;
    height: 100%;
    h3 {
      position: absolute;
      bottom: 50px;
      left: 100px;
      z-index: 2001;
      max-width: 500px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    // line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
