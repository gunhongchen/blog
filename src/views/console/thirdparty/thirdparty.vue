<template>
  <div class="thirdparty">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  },
})
export default class ThirdParty extends Vue {
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/public.scss";

</style>
