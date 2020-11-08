<template>
  <div class="login">
    <el-form ref="form" :model="form">
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="form.userName"
          clearable
          @keyup.enter.native="onSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          @keyup.enter.native="onSubmit"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isloading"
          >登录</el-button
        >
        <el-link type="primary" class="link">
          <router-link to="/">返回首页</router-link>
        </el-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Message } from "element-ui";
import * as consoleHttp from "../../http/api/auth";

@Component({
  components: {},
})
export default class Login extends Vue {
  isloading: boolean = false;
  form = {
    userName: "",
    password: "",
  };

  onSubmit() {
    if (!this.form.userName) {
      Message.warning("请输入用户名");
      return;
    }
    if (!this.form.password) {
      Message.warning("请输入密码");
      return;
    }
    consoleHttp
      .login({ userName: this.form.userName, password: this.form.password })
      .then((res) => {
        // console.log(res)
        this.$router.push("/console");
      })
      .catch((err) => {
        Message.error(err.message);
      });
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/public.scss";
.login {
  position: absolute;
  width: 30%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.link {
  margin-left: 20px;
  a {
    color: rgb(21, 144, 226);
  }
}
/deep/ {
  .el-form-item__content {
    text-align: center;
  }
}
</style>
