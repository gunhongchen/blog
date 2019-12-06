<template>
    <div class="article">
        <el-card class="nav">
            <ul class="tree size-stitle">
                <li v-for="(item, i) in tagData" :key="i" @click="selected(item)">
                    <p>{{item.name}}<span>（{{item.count}}）</span></p>
                </li>
            </ul>
        </el-card>
        <el-card class="list" infinite-scroll-distance="50" v-infinite-scroll="loadData(1)" infinite-scroll-delay="800">
            <el-timeline>
                <el-timeline-item
                v-for="(item, index) in articleData"
                :key="index"
                :timestamp="item.createTime | date()">
                <el-card>
                    <h4>{{item.title}}</h4>
                </el-card>
                </el-timeline-item>
            </el-timeline>
            <p><i class="el-icon-loading"></i></p>
            <p>没有了</p>
        </el-card>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as clientHttp from '../../http/api/client';
import * as articleHttp from '../../http/api/article';
import { TabaData } from '../../components/datamodel/Table';

@Component({
  components: {},
}) 
export default class Article extends Vue {

    tagData: Array<{}> = [];
    selectedTag: {
        _id?: string;
    } = {};

    currentPage: number = 1;
    articleData: Array<{}> = [];

    isOver: boolean = false;
    isload:boolean = false;
    created() {
        clientHttp.getTags().then(res => {
            this.tagData = res.data;
            this.selectedTag = this.tagData[0];
            this.loadData();
        })
    }

    selected(item) {
        if(this.selectedTag._id == item._id) {
            return;
        }
        this.currentPage = 1;
        this.selectedTag = item;
        this.loadData();
    }

    loadData(isLoad?) {
        console.log(this.isOver)
        console.log(isLoad)
        if(this.isOver || !this.selectedTag._id || this.isload) {
            return;
        }else {
            this.isOver  = false;
        }
        this.isload = true;
        const page = {
            size: 5,
            currentPage: this.currentPage,
            selectedTag: this.selectedTag._id,
        }
        articleHttp.getList(page).then(res => {
            console.log(res)
            if(isLoad && !this.isOver) {
                this.currentPage+=1;
                this.articleData = [...this.articleData,...res.data.content];
                console.log(this.articleData)
            }else if(!isLoad && !this.isOver) {
                this.articleData = res.data.content;
                console.log(this.articleData)
            }
            console.log(this.currentPage)
            console.log(res.data.total)
            console.log(page.size)
            this.isOver = res.data.total/page.size+1 <= this.currentPage;
            this.isload = false;
        })
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
.article{
    width:100%;
    position:absolute;
    top:50px;
    bottom: 0;
    perspective: 1000px;
    transition: 1s;
    .nav,
    .list{
        width: 45%;
        min-height:200px;
        position:absolute;
        max-height: 80vh;
        overflow: auto;
    }
    .nav{
        left :0;
        transform: rotateY(10deg);
        transform-origin: left;
    }
    .list{
        right:0;
        transform: rotateY(-10deg);
        transform-origin: right;
        p{
            text-align: center;
            font-size: 16px;
            color: #ddd;
        }
    }
    .border{
        border: 1px solid $color-1;
    }
    .tree {
        li{
            padding: 15px 10px;
            &:hover{
                background-color: $color-1;
                color:#fff;
            }
        }
    }
    // /deep/ {
    //     .el-tree-node__expand-icon.is-leaf{
    //         color: #C0C4CC;
    //     }
    // }
}
</style>
