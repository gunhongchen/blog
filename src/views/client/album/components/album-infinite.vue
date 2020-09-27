<template>
    <div class="album-infinite">
        <div class="album-box mt-20 mb-20">
            <div class="album-single" v-for="item in albums" :key="item._id">
                <div class="img">
                    <img :src="item.imgUrl || item.defaultImg || '/images/albums.jpg'" alt="">
                </div>
                <div>
                    <p class="size-title color-2">{{item.name}}</p>
                    <p class="color-3">{{item.createdTime | date}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as albumHttp from '../../../../http/api/client/album';

@Component({
  components: {},
})
export default class AlbumInfinite extends Vue {
    albums: Array<any> = [];
    created() {
        // id为0，所有第一级图集
        this.getAlbum(0);
    }
    getAlbum(id) {
        albumHttp.getAlbum(id).then((res: any) => {
            this.albums = res;
        })
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/styles/public.scss';
.album-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between
}
.album-single{
    width: 31%;
    display: flex;
    flex-direction: column;
    .img{
        width: 100%;
        flex-grow: 1;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
