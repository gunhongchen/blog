<template>
  <div class="c-tags-layout">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class CTagsLayout extends Vue {}
</script>