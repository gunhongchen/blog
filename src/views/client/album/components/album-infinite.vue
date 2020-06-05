<template>
    <div class="album-infinite">
        <div class="album-box mt-20 mb-20">
            <div class="album-single" v-for="item in albums" :key="item._id">
                <div class="img">
                    <img :src="item.imgUrl || item.defaultImg || '/static/images/albums.jpg'" alt="">
                </div>
                <div>
                    <p>{{item.name}}</p>
                    <p>{{item.createdTime | date}}</p>
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
        this.getAlbum(0);
    }
    getAlbum(id) {
        albumHttp.getAlbum(id).then((res: any) => {
            console.log(res);
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
