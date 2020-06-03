<template>
  <div class="user-form">
      <el-form ref="form" :rules="rules" :model="form" :label-position="'right'" label-width="100px" @submit.native.prevent>
        <el-row :gutter="24">
          <el-col :span="20" :offset="2">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password"  show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input v-model="form.password2"  show-password></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="power">
              <el-select v-model="form.power" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="isloading">保存</el-button>
              <router-link to="/console/tags">
                <el-button>取消</el-button>
              </router-link>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Message } from 'element-ui';
import * as userHttp from '../../../../http/api/console/user';

@Component({
  components: {},
})
export default class UserForm extends Vue {
    @Prop() user;
    @Emit() submit(n){ }
    @Prop() isloading!: boolean;
    form= this.user || {userName: '',password: '',power: ''};
    options = [
        {value:'A',label: '管理权限'},
        {value:'B',label: '评论权限'},
        {value:'C',label: '仅浏览权限'},
    ]
    PasswordREG = /[A-Z]+\w*/g;
    validatePass = (rule?, value?, callback?) => {
      let istrue = this.PasswordREG.test(value);
      this.PasswordREG.lastIndex = 0;
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(istrue){
        callback();
      } else {
        callback(new Error('最少6位且至少包含一个大写字母'))
      }
    };
    validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    isexist = (rule, value, callback) => {
      if(value) {
        userHttp.isexist({userName: value}).then(res => {
          callback();
        }).catch(err => {
          callback(new Error('用户名已存在'))
        })
      }
    }
    rules = {
      userName: [
        {required: true, message:'用户名必填', trigger: 'change'},
        {validator: this.isexist, trigger: 'blur'}
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {validator: this.validatePass, trigger: 'blur'}
      ],
      password2: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {validator: this.validatePass2, trigger: 'blur'}
      ],
      power: [
        {required: true, message:'请选择权限', trigger: 'change'}
      ]
    }
    onSubmit() {
      this.$refs['form']['validate'](valid => {
        if(valid) {
          this.submit(this.form)
        }else {
          Message.error('请正确输入信息')
        }
      })
    }
}
</script>

<style lang="scss" scoped>
  .tags-form{
    width:100%;
  }
  /deep/ {
    .el-input{
      max-width: 80%;
    }
    .el-button.el-button--primary{
      margin-right:15px;
    }
  }
</style>