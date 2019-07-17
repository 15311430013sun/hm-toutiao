<template>
  <div class="login-container">
    <!-- Login -->
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()" style="width:100%">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 校验手机号
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      // 表单对应的对象
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单的校验规则对象
      loginRules: {
        mobile: [
          // 具体的校验规则
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '必须是6位', trigger: 'blur' }
        ]
      },

      // 默认选中复选框
      checked: true
    }
  },
  methods: {
    login () {
      // // 整体表单验证
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     // 如果校验成功，登录，发送axios
      //     this.$axios
      //       .post(
      //         'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
      //         this.loginForm
      //       )
      //       .then((res) => {
      //         // 响应对象
      //         const data = res.data
      //         console.log(data)
      //         // 保持登录状态 token
      //         window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
      //         this.$router.push('/')
      //       })
      //       .catch(() => {
      //         // 提示错误
      //         this.$message.error('用户名或者密码错误')
      //       })
      //   }
      // })
      // 异步操作async与await
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$axios
              .post(
                'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
                this.loginForm
              )
            window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            // 提示错误
            this.$message.error('用户名或者密码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  // background-color: red;
  background: url("../../assets/images/login_bg.jpg") no-repeat center/cover;
  .box-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto 30px;
    }
  }
}
</style>
