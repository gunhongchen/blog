<template>
    <div class="album">
        <AlbumCarousel></AlbumCarousel>
        <div class="album-box">
          <AlbumInfinite></AlbumInfinite>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlbumCarousel from './components/album-carousel.vue';
import AlbumInfinite from './components/album-infinite.vue';

@Component({
  components: {
    AlbumCarousel,
    AlbumInfinite
  },
})
export default class Album extends Vue {}
</script>
<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
.album-box{
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
}
</style>
