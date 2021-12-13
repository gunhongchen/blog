<template>
  <div class="m-header">
    <van-nav-bar>
      <template #left>
      <div class="logo">HOME</div>
      </template>
      <template #right>
        <van-dropdown-menu active-color="#1989fa" z-index="1501">
          <van-dropdown-item ref="dropdownitem">
            <template #title>
              <van-icon name="wap-nav" />
            </template>
            <van-cell v-for="(item, i) of options" :key="i" center :title="item.text" @click="menuChange(item)">
            </van-cell>
          </van-dropdown-item>
        </van-dropdown-menu>
        <van-action-sheet v-model="showSheet" :actions="tags" cancel-text="取消" close-on-click-action
          @select="selectedTag($event)" />
      </template>
    </van-nav-bar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
  import * as tagHttp from "../../http/api/client/tags";
  import DropdownItem from "vant";

@Component({
  components: {},
})
export default class MHeader extends Vue {
  options = [
    { text: "首页", value: 0, url: '/m' },
    {text: "日志分类", value: 1},
    { text: "图集", value: 2, url: '/m/album' },
  ];
  showSheet= false;
  tags = [];

  created() {
    this.loadTags();
  }

  menuChange(v) {
    if(v.url) {
      this.$router.push(v.url);
    } else {
      this.showSheet = true;
    }
    (this as any).$refs.dropdownitem['toggle']();
  }

  loadTags() {
    tagHttp.getTags().then((res: any) => {
      this.tags = res;
    });
  }

  selectedTag(v) {
    this.$router.push(`/m/article/tag/${v._id}`);
  }
}
</script>
<style lang="scss" scoped>
  /deep/ {
    .van-dropdown-menu__title::after{
      display: none;
    }
    .van-dropdown-menu__bar{
      height: auto;
      box-shadow: none;
      i{
        font-size: 1.2rem;
      }
    }
    .van-popover__wrapper{
      width: 100%;
    }
  } 
</style>
