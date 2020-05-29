<template>
    <div class="repliceslist ml-20" v-loading="loading">
        <div class="replices mb-20" v-for="item in replicesData" :key="item._id">
          <div class="overflow-hidden">
            <div class="float-left size-stitle color-3">
              <span>{{item.createdBy.userName}}</span>
              <p class="inline-block" v-if="replices">
                <span class="ml-10">回复</span>
                <span class="ml-10">{{item.repliedUser.userName}}</span>
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
          <div class="mt-20" v-if="item.replyCount>0 && !replices">
            <ReplicesList :replices="item.replicesData"></ReplicesList>
          </div>
          <div v-if="currentReply._id===item._id">
            <ReplicesTemplate @submit="replySubmit" @close="closeReply"></ReplicesTemplate>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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
  @Prop() replices;
  loading = false;
  currentReply: ReplyData = {};
  replicesData: Array<ReplyData> = [];
  mounted() {
    console.log(this.currentProject)
    if(this.currentProject && '_id' in this.currentProject) {
        this.getReplices(this.currentProject._id);
    }
  }

  // updated(v) {
  //   if(this.currentProject && '_id' in this.currentProject) {
  //       this.getReplices(this.currentProject._id);
  //   }
  // }

  getReplices(id) {
    this.loading = true;
    replyHttp.getReplices(id).then((res: any) => {
        this.replicesData = res;
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
    replyHttp.comment(this.currentReply._id, v).then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
</style>
