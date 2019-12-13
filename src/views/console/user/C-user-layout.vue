<template>
  <div class="c-user-layout">
      <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class CUserLayout extends Vue {}
</script>