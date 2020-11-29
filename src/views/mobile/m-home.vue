<template>
  <div class="m-home">
    <van-sticky z-index="1501">
      <div class="shadow">
        <MHeader></MHeader>
      </div>
    </van-sticky>
    <div class="article p-4">
      <div class="article-box flex shadow p-2" v-for="(item, i) of articleData" :key="i" @click="goDetail(item)">
        <div class="img">
          <van-image width="7rem" height="7rem" :src="item.cover" />
        </div>
        <div class="info ml-2 py-2 flex flex-col justify-around">
          <p class="text-2xl font-bold">{{item.title}}</p>
          <p class="text-gray-500">{{item.description}}</p>
          <p class="text-gray-500">
            <span v-if="item.tag">
              <van-icon name="label-o" />
              {{ getTag(item.tag) }}
              <!-- <van-tag plain type="primary"></van-tag> -->
            </span>
            <span class="ml-10">
              <van-icon name="notes-o" />
              {{ item.createTime | date("yyyy-MM-dd") }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import * as articleHttp from "../../http/api/client/article";
  import * as tagHttp from "../../http/api/client/tags";
  import MHeader from '@/components/mobile/m-header.vue';

  @Component({
    components: { MHeader },
  })
  export default class MHome extends Vue {
    isloading: boolean = false;
    articleData: any = [];
    tags: any = [];
    pagination: any = {};

    created() {
      this.loadArticle();
      this.loadTags();
    }

    // homeNav: Array<{}> = [
    //   {name: 'article', url: '/article'},
    //   {name: '我思故我在'},
    //   {name: 'album', url: '/album'},
    // ]

    loadArticle() {
      this.isloading = true;
      const page = {
        size: this.pagination.size || 10,
        currentPage: this.pagination.currentPage || 1,
      };
      articleHttp.getList(page).then((res) => {
        this.articleData = res["content"];
        this.isloading = false;
        this.pagination = res;
      });
    }

    loadTags() {
      tagHttp.getTags().then((res: any) => {
        this.tags = res;
      });
    }

    getTag(id) {
      const tag = this.tags.find((v) => {
        return v._id === id;
      });
      return tag && tag.name;
    }

    goDetail(currentArticle) {
      this.$router.push(`/m/article/${currentArticle._id}`);
    }
  }
</script>
<style lang="scss" scoped>
</style>