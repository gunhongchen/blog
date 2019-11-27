<template>
  <div class="home">
      <el-row :gutter="10" :type="'flex'" :justify="'center'">
        <el-col :span="22">
          home
        </el-col>
      </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
  .home{
    // position:relative;
    // top:50%;
    // transform: translateY(-50%);
  }
  .nav{
    background-color:rgba(200,200,200,.5);
  }
</style>
