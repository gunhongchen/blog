<template>
    <div class="login">
        <el-form ref="form" :model="form" >
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="isloading">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Message} from 'element-ui';
import * as consoleHttp from '../../http/api/console';

@Component({
  components: {},
})
export default class Login extends Vue {
    isloading: boolean = false;
    form = {
        userName: '',
        password: ''
    }

    onSubmit(v) {
        if(!this.form.userName) {
            Message.error('请输入用户名')
            return;
        }
        if(!this.form.password) {
            Message.error('请输入密码')
            return;
        }
        console.log(this.form)
        consoleHttp.login({userName: this.form.userName, password: this.form.password}).then(res => {
            console.log(res)
        })
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/public.scss';
.login{
    position: absolute;
    width: 30%;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}
/deep/ {
    .el-form-item__content{
        text-align:center;
    }
}
</style>
