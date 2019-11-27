<template>
  <div class="c-article-layout">
      <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class CArticleLayout extends Vue {}
</script>