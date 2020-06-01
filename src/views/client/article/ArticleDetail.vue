<template>
    <div class="article-detail">
        <div class="detail-container" v-loading="loading">
            <div class="detail-head">
                <p class="title color-1">{{article.title}}</p>
                <p><span>{{article.createTime | date()}}</span></p>
            </div>
            <mavon-editor v-model="article.content" previewBackground="#fff" :boxShadow="false" :toolbarsFlag="false" :subfield="false" defaultOpen="preview"/>
            <div>
                <span>评论回复</span>
                <span class="ml-10 color-2">共{{article.commontCount || 0}}条评论</span>
            </div>
            <div class="replices">
                <ReplicesTemplate @submit="replySubmit" :loading="btnLoading"></ReplicesTemplate>
                <ReplicesList :currentProject="article" :isReplied="isReplied"></ReplicesList>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as articleHttp from '../../../http/api/article';
import * as replyHttp from '../../../http/api/reply';
import {Article} from '../../console/article/components/Article';
import ReplicesTemplate from '@/components/replices/Replices.vue';
import ReplicesList from '@/components/replices/ReplicesList.vue';
import {Message} from 'element-ui';

@Component({
  components: {
    ReplicesTemplate,
    ReplicesList
  },
})
export default class ArticleDetail extends Vue {
    loading: boolean = false;
    btnLoading: boolean = false;
    article: Article = {};
    articleReplices = [];
    isReplied = false;
    mounted() {
        this.getData(this.$route.params.id);
    }

    getData(id) {
        this.loading = true;
        articleHttp.getOne(id).then((res: any) => {
            this.article = res;
            this.loading = false;
        })
    }
    replySubmit(v) {
        this.btnLoading = true;
        replyHttp.comment(this.$route.params.id, v).then(res => {
            Message.success('评论成功');
            this.isReplied = !this.isReplied;
            this.btnLoading = false;
        })
    }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
.detail-container{
    width: 80%;
    margin: 20px auto 0;
    .detail-head{
        .title{
            font-size:1.8em;
            font-weight:600;
        }
    }
}
.replices{
    width: 70%;
}
/deep/ {
    .v-note-wrapper.markdown-body{
        border: 0;
    }
}
</style>