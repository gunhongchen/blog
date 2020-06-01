<template>
    <div class="repliceslist ml-20" v-loading="loading">
        <div class="replices mb-20" v-for="item in replicesData" :key="item._id">
          <div class="overflow-hidden">
            <div class="float-left size-stitle color-3">
              <span>{{item.createdBy.userName}}</span>
              <p class="inline-block" v-if="commont">
                <span class="ml-10">回复</span>
                <span class="ml-10 size-stitle">{{item.repliedUser && item.repliedUser.userName}}</span>
              </p>
              <span class="ml-20">{{item.createdTime | date}}</span>
            </div>
            <p class="float-right size-stitle">
              <span @click="showReply(item)">
                <el-link type="primary">回复</el-link>
              </span>
            </p>
          </div>
          <div class="ml-10 mt-10 color-2">
            <p>{{item.content}}</p>
          </div>
          <div class="mt-20" v-if="item.replicesCount>0 && !commont">
            <ReplicesList :commont="item"></ReplicesList>
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
import {ReplyData} from '@/components/datamodel/Reply';

@Component({
  components: {
    ReplicesTemplate,
    ReplicesList
  },
})
export default class ReplicesList extends Vue {
  @Prop() currentProject;
  @Prop() commont;
  @Prop() isReplied;
  loading = false;
  currentReply: ReplyData = {};
  replicesData: Array<ReplyData> = [];

  @Watch('isReplied')
  onChangeValue(newVal: string, oldVal: string){
    if(this.currentProject && '_id' in this.currentProject) {
      this.getReplices(this.currentProject._id);
    }
  }
  @Watch('replicesData')
  onreplicesDataChange() {}
  mounted() {
    if (this.commont && this.commont.replicesCount) {
      replyHttp.getReplices(this.commont._id).then((res: any) => {
        this.replicesData = res;
      });
      return;
    }
    this.getReplices(this.$route.params.id);
  }

  getReplices(id) {
    this.loading = true;
    replyHttp.getComments(id).then((res: any) => {
        this.replicesData = Object.assign({}, this.replicesData, res);
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
    replyHttp.reply(this.commont ? this.commont._id : this.currentReply._id, v, this.currentReply.targetId ? undefined : this.currentReply._id).then(res => {
      this.closeReply();
      this.$parent['isReplied'] = !this.$parent['isReplied'];
      if (this.commont && this.commont.replicesCount) {
        replyHttp.getReplices(this.commont._id).then((res: any) => {
          this.replicesData = res;
        });
        return;
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
</style>
