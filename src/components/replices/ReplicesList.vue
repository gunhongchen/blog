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
              <span class="ml-20">{{item.createdData | date}}</span>
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
            <ReplicesTemplate @close="closeReply"></ReplicesTemplate>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ReplicesTemplate from './Replices.vue';

@Component({
  components: {
    ReplicesTemplate,
    ReplicesList
  },
})
export default class ReplicesList extends Vue {
  @Prop() replices;
  currentReply = {};
  loading = false;
  replicesData = [
    {
      _id: 'asdgdfg243',
      content: 'wtf',
      createdBy: {
        _id: 'sdf',
        userName: 'zhnagsan',
      },
      createdData: 1590717114477,
      publish: true,
      repliedUser: {
        _id: 'sdfw',
        userName: 'lisi'
      },
      replyCount: 2,
      replicesData: [
        {
          _id: 'asdgdfg2',
          content: 'wtf',
          createdBy: {
            _id: 'sdf',
            userName: 'zhnagsan',
          },
          createdData: 1590717114477,
          publish: true,
          repliedUser: {
            _id: 'sdfw',
            userName: 'lisi'
          }
        },
        {
          _id: 'asdgd243',
          content: 'wtf',
          createdBy: {
            _id: 'sdf',
            userName: 'zhnagsan',
          },
          createdData: 1590717114477,
          publish: true,
          repliedUser: {
            _id: 'sdfw',
            userName: 'lisi'
          }
        }
      ]
    },
    {
      _id: 'asdgdfg2',
      content: 'wtf',
      createdBy: {
        _id: 'sdf',
        userName: 'zhnagsan',
      },
      createdData: 1590717114477,
      publish: true,
      repliedUser: {
        _id: 'sdfw',
        userName: 'lisi'
      }
    },
    {
      _id: 'asdgd243',
      content: 'wtf',
      createdBy: {
        _id: 'sdf',
        userName: 'zhnagsan',
      },
      createdData: 1590717114477,
      publish: true,
      repliedUser: {
        _id: 'sdfw',
        userName: 'lisi'
      }
    }
  ]
  mount() {
    this.replicesData = this.replices ? this.replices : this.replicesData;
  }
  showReply (item) {
    this.currentReply = item;
  }
  closeReply() {
    this.currentReply = {};
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
</style>
