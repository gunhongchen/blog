<template>
    <div class="repliceslist ml-20" v-loading="loading">
        <div class="replices mb-20" v-for="item in replicesData" :key="item._id">
          <div class="overflow-hidden">
            <div class="float-left size-stitle color-3">
              <span>{{item.createdBy.userName}}</span>
              <p class="inline-block" v-if="comment">
                <span class="ml-10">回复</span>
                <span class="ml-10 size-stitle">{{item.repliedUser && item.repliedUser.userName}}</span>
              </p>
              <span class="ml-20">{{item.createdTime | date}}</span>
            </div>
            <p class="float-right size-stitle">
              <span @click="showReply(item)" v-if="!isConsole">
                <el-link type="primary">回复</el-link>
              </span>
              <span class="inline-block cursor-pointer size-title" v-if="isConsole">
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="deleteReplices(item)"
                >
                  <template #reference>
                    <i class="el-icon-delete color-danger"></i>
                  </template>
                </el-popconfirm>
                <el-divider direction="vertical"></el-divider>
                <el-popconfirm
                  :title="item.publish ? '确定取消发布吗？' : '确定发布吗？'"
                  @onConfirm="publishReplices(item)"
                >
                  <template #reference>
                    <i class="el-icon-view" :class="{'color-active': !item.publish}"></i>
                  </template>
                </el-popconfirm>
              </span>
            </p>
          </div>
          <div class="ml-10 mt-10 color-2">
            <p>{{item.content}}</p>
          </div>
          <div class="mt-20" v-if="item.replicesCount>0 && !comment">
            <ReplicesList :comment="item" :isConsole="isConsole" :isReplied="isReplied"></ReplicesList>
          </div>
          <div v-if="currentReply._id===item._id">
            <ReplicesTemplate @submit="replySubmit" @close="closeReply"></ReplicesTemplate>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import ReplicesTemplate from './Replices.vue';
import * as replyHttp from '../../http/api/reply';
import * as consoleReplyHttp from '../../http/api/console/reply';
import {ReplyData} from '@/components/datamodel/Reply';
import {Message} from 'element-ui';

@Component({
  components: {
    ReplicesTemplate,
    ReplicesList
  },
})
export default class ReplicesList extends Vue {
  @Prop() currentProject;
  @Prop() comment;
  @Prop() isReplied;
  @Prop() isConsole;
  loading = false;
  currentReply: ReplyData = {};
  replicesData: Array<ReplyData> = [];
  replyhttp: any;

  @Watch('isReplied')
  onChangeValue(newVal: string, oldVal: string){
    if(this.currentProject && '_id' in this.currentProject) {
      this.getReplices(this.currentProject._id);
    }
    if (this.comment && this.comment.replicesCount) {
      this.replyhttp.getReplices(this.comment._id).then((res: any) => {
        this.replicesData = res;
      });
      return;
    }
  }
  @Watch('replicesData')
  onreplicesDataChange() {}

  @Watch('currentProject')
  oncurrentProjectChange() {}
  mounted() {
    this.replyhttp = this.isConsole ? consoleReplyHttp : replyHttp;
    if (this.comment && this.comment.replicesCount) {
      this.replyhttp.getReplices(this.comment._id).then((res: any) => {
        this.replicesData = res;
      });
      return;
    }
    this.getReplices(this.$route.params.id);
  }

  getReplices(id) {
    this.loading = true;
    this.replyhttp.getComments(id).then((res: any) => {
        this.replicesData =  res;
        this.loading = false;
    })
  }
  showReply (item) {
    this.currentReply = item;
  }
  closeReply() {
    this.currentReply = {};
  }
  replySubmit(v) {
    this.replyhttp.reply(this.comment ? this.comment._id : this.currentReply._id, v, this.currentReply.targetId ? undefined : this.currentReply._id).then(res => {
      this.closeReply();
      this.$parent['isReplied'] = !this.$parent['isReplied'];
    })
  }
  deleteReplices(v) {
    if(v.targetId) {
      this.replyhttp.deleteComments(v.targetId, v._id).then(res => {
        this.$parent.$parent['isReplied'] = !this.$parent.$parent['isReplied'];
        Message.success('删除成功');
      })
    }else {
      this.replyhttp.deleteReplices(v.commentId, v._id).then(res => {
        this.$parent.$parent.$parent['isReplied'] = !this.$parent.$parent.$parent['isReplied'];
        Message.success('删除成功');
      })
    }
  }

  publishReplices(v) {
    if(v.targetId) {
      this.replyhttp.publishComments(v.targetId, v._id, !v.publish).then(res => {
        this.$parent.$parent['isReplied'] = !this.$parent.$parent['isReplied'];
        Message.success(v.publish ? '取消发布成功' : '发布成功');
      })
    }else {
      this.replyhttp.publishReplices(v._id, !v.publish).then(res => {
        this.$parent['isReplied'] = !this.$parent['isReplied'];
        Message.success(v.publish ? '取消发布成功' : '发布成功');
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
</style>
