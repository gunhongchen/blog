<template>
  <div class="article">
    <!-- <client-header></client-header> -->
    <div class="article-box">
      <el-card class="nav" shadow="never">
        <ul class="tree">
          <template v-if="tagData.length > 0">
            <li v-for="(item, i) in tagData" :key="i" @click="selected(item)">
              <p class="size-title">
                {{ item.name }}<span>（{{ item.count }}）</span>
              </p>
            </li>
          </template>
          <template v-else>
            <p class="emptyTitle">暂无数据</p>
          </template>
        </ul>
      </el-card>
      <el-card class="list" shadow="never">
        <template v-if="articleData.length > 0">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in articleData"
              :key="index"
              :timestamp="item.createTime | date('yyyy-MM-dd')"
            >
              <router-link :to="'/article/' + item._id">
                <el-card shadow="hover">
                  <h4>{{ item.title }}</h4>
                </el-card>
              </router-link>
            </el-timeline-item>
          </el-timeline>
          <p class="emptyTitle cursor-p" v-if="!islast" @click="loadData(1)">
            点击加载更多<i v-if="isloading" class="el-icon-loading"></i>
          </p>
          <!-- <p v-if="islast" @click="noData">{{noDataText}}</p> -->
        </template>
        <template v-else>
          <p class="emptyTitle">暂无数据</p>
        </template>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as tagsHttp from "../../../http/api/client/tags";
import * as articleHttp from "../../../http/api/client/article";
import { TabaData } from "../../../components/datamodel/Table";
import ClientHeader from "../public/client-header.vue";

@Component({
  components: {
    ClientHeader,
  },
})
export default class Article extends Vue {
  tagData: any = [];
  selectedTag: {
    _id?: string;
  } = { _id: "" };

  currentPage: number = 1;
  articleData: Array<{}> = [];
  isloading: boolean = false;
  islast: boolean = false;
  noDataText: string = "没有了";
  created() {
    tagsHttp.getTags().then((res) => {
      this.tagData = res;
      // this.selectedTag = this.tagData[0];
      this.loadData();
    });
  }

  selected(item) {
    if (this.selectedTag._id == item._id) {
      return;
    }
    this.currentPage = 1;
    this.selectedTag = item;
    this.loadData();
  }

  loadData(isNext?) {
    if (this.isloading) {
      return;
    }
    this.isloading = true;
    const page = {
      size: 10,
      currentPage: this.currentPage,
      selectedTag: this.selectedTag._id,
    };
    articleHttp.getList(page).then((res) => {
      this.currentPage += 1;
      const data: any = res;
      this.islast = Math.ceil(data.total / data.size) < this.currentPage;
      if (isNext) {
        this.articleData.push(...data.content);
        return;
      }
      this.articleData = data.content;
      this.isloading = false;
    });
  }

  noData() {
    this.noDataText = "说了没有了";
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/public.scss";
.article-box {
  width: 100%;
  position: absolute;
  top: 100px;
  bottom: 0;
  perspective: 1000px;
  transition: 1s;
  .nav,
  .list {
    width: 47%;
    min-height: 200px;
    position: absolute;
    max-height: 80vh;
    overflow: auto;
    right: 0;
    transform: rotateY(-10deg);
    transform-origin: right;
    h4 {
      font-size: 1.3em;
    }
  }
  .nav {
    left: 0;
    transform: rotateY(10deg);
    transform-origin: left;
  }
  .border {
    border: 1px solid $color-1;
  }
  .tree {
    li {
      cursor: pointer;
      padding: 15px 10px;
      text-align: right;
      &:hover {
        background-color: $color-1;
        color: #fff;
      }
    }
  }
  .emptyTitle {
    text-align: center;
    font-size: 16px;
    color: #ddd;
  }
  /deep/ {
    .el-card {
      border: 0;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
    }
  }
}
</style>
