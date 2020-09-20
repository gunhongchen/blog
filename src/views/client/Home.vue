<template>
  <div class="home  color-2">
      <!-- <el-row :gutter="10" :type="'flex'" :justify="'center'">
        <el-col :span="22">
          <p class="navitem mb-10" v-for="(item,i) of homeNav" :key="i">
            <template v-if="item.url">
              <router-link :to="item.url" class="color-link size-title">
                {{item.name}}
              </router-link>
            </template>
            <template v-else>
              <span class="size-title color-2">{{item.name}}</span>
            </template>
          </p>
        </el-col>
      </el-row> -->

      <div class="container p-20 overflow-hidden">
        <div class="articles float-left">
          <div class="articlebox" v-for="(item, i) of articleData" :key="i" :class="{'float-left': i%2 !=0, 'float-right': i%2 == 0}">
            <div class="cover" v-if="item.cover">
              <img :src="item.cover" alt="">
            </div>
            <div class="article-info">
              <h4 class="title mb-10 mt-10">{{item.title}}</h4>
              <p>
                <span v-if="item.tag">
                  <i class="el-icon-price-tag"></i>
                  {{getTag(item.tag)}}
                </span>
                <span class="ml-10">
                  <i class="el-icon-date"></i>
                  {{item.createTime | date(1)}}
                </span>
              </p>
            </div>
          </div>
          <div class="clearfix"></div>
          <el-pagination
            :total="pagination.total"
            :current-page="pagination.currentPage"
            :page-size="pagination.size"
            :hide-on-single-page="true"
            layout="prev, pager, next"
            :pager-count="7"
            :page-sizes="[10,20,30,40,50]"
            @size-change="loadArticle"
            @prev-click="loadArticle"
            @next-click="loadArticle"
            @current-change="loadArticle">
          </el-pagination>
        </div>
        <div class="info float-right">
          <div class="tag-box">
            <el-divider content-position="left">所有标签</el-divider>
            <div class="tag inline-block" v-for="(item, i) of tags" :key="i">
              <el-tag>
                <i class="el-icon-price-tag"></i>
                <span>{{item.name}}</span>
                <span class="ml-10">{{item.count}}</span>
              </el-tag>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as articleHttp from '../../http/api/article';
import * as tagHttp from '../../http/api/client/tags';

@Component({
  components: {},
})
export default class Home extends Vue {

  isloading: boolean = false;
  articleData: any = [];
  tags: any = [];
  pagination: any = {};

  created () {
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
        currentPage: this.pagination.currentPage || 1
    }
    articleHttp.getList(page).then(res => {
        this.articleData = res['content'];
        this.isloading = false;
        this.pagination = res;
    })
  }

  loadTags() {
    tagHttp.getTags().then((res: any) => {
      this.tags = res;
    })
  }

  getTag(id) {
    return this.tags.find(v => {
      return v._id === id;
    }).name
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
  // .home{
  //   position:relative;
  //   top:50%;
  //   transform: translateY(-50%);
  //   text-align: center;
  // }
  .container{
    width: 1200px;
    margin: 0 auto;
  }
  .articles{
    width: 75%;
    min-width: 500px;
    box-sizing: border-box;
  }
  .info{
    width: 25%;
    min-width: 200px;
    box-sizing: border-box;
    padding: 10px;
    padding-left: 20px;
  }
  .articlebox{
      width: 48%;
      padding: 10px;
      display: inline-block;
      box-sizing: border-box;
    .cover{
      width: 100%;
      height: 250px;
    }
    img{
      width: 100%;
      height: 100%;
    }
    .title{
      font-size: 24px;
      font-weight: 800;
    }
  }
  .tag{
    margin-right: 5px;
    margin-bottom: 10px;
  }
  .nav{
    background-color:rgba(200,200,200,.5);
  }
  /deep/ {
    .el-pagination{
      text-align: right;
    }
  }
</style>
