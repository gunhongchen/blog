<template>
    <div class="m-album">
        <van-sticky z-index="1501">
            <div class="shadow">
                <MHeader></MHeader>
            </div>
        </van-sticky>
        <div class="albums p-4">
            <div class="album-box text-0 relative mb-4" v-for="(item,i) of albums" :key="i">
                <van-image :src="item.imgUrl ||
              (item.imgList && item.imgList[0])" @click="showList(item)">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
                <div v-if="item" class="album-info absolute w-full bottom-0 px-3 py-1">
                    <p class="text-gray-300 text-3xl font-bold">{{ item.name }}</p>
                    <p class="text-gray-400">
                        {{ item.createdTime | date("yyyy-MM-dd") }}
                    </p>
                </div>
            </div>
        </div>
        <van-image-preview v-model="showPreview" :images="images" :closeable="true">
        </van-image-preview>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import * as albumHttp from "../../../http/api/client/album";
    import MHeader from '@/components/mobile/m-header.vue';

    @Component({
        components: { MHeader },
    })
    export default class MAlbum extends Vue {
        albums: Array<any> = [];
        showPreview: boolean = false;
        images: Array<string> = [];
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
        showList(item) {
            this.images = item.imgList;
            this.showPreview = true;
        }
    }
</script>
<style lang="scss" scoped>
    .album-box {
        font-size: 0;
    }

    .album-info {
        background-color: rgba(0, 0, 0, .3);
    }
</style>