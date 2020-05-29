<template>
  <div class="c-user-add">
      <Title :title="'添加标签'" backurl="/console/user"></Title>
      <div class="article-content p-20">
        <el-card class="box-card">
          <UserForm :isloading="isloading" @submit="onSubmit"></UserForm>
        </el-card>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import UserForm from './components/User-form.vue';
import { Message } from 'element-ui';
import * as userHttp from '../../../http/api/console/user';

@Component({
  components: {
      Title,
      UserForm
  },
})
export default class CUserAdd extends Vue {
  isloading: boolean = false;
  onSubmit(v) {
    this.isloading = true;
    userHttp.addUser({userName: v.userName,password: v.password, power: v.power}).then(res => {
      this.$router.push({path: '/console/user'})
      this.isloading = false;
    }).catch(err => {
      Message({
        message: err.response.data,
        type: 'error'
      })
      this.isloading = false;
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/public.scss';
    
</style>