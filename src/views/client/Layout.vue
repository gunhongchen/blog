<template>
    <div class="layout">
        <!-- <Header :title="title"></Header> -->
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';

@Component({
  components: {
    Header
  },
})
export default class Layout extends Vue {
  title = 'Home'
}
</script>
<style lang="scss" scoped>
.layout{
  height:100%;
}
</style>
