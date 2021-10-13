<template>
    <div class="live">
        <Video></Video>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Video from '@/components/player/index.vue'

@Component({
  components: {
      Video
  }
})
export default class Live extends Vue {}
</script>