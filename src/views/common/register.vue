<template>
  <div>
    <div class="login-wrap-box login-wrap-box1">
      <div class="wrap clearfix">
        <div class="login-main login-main1">
          <div class="name">平台充值</div>
          <div class="login-title">注册</div>
          <el-form  :model="registerForm" :rules="registerFormRule"  ref="registerForm" @keyup.enter.native="login()" status-icon>
            <el-form-item prop="userNumber1">
              <label class="label" for="userNumber">账号 :</label>
              <el-input v-model="registerForm.userNumber" placeholder="请输入手机号"></el-input>
              <span class="tips">*</span>
            </el-form-item>
            <el-form-item prop="referrer">
              <label class="label" for="referrer">推荐码 :</label>
              <el-input v-model="registerForm.referrer" type="text" placeholder="请输入推荐码"></el-input>
              <span class="tips">*</span>
            </el-form-item>
            <el-form-item prop="password">
              <label class="label" for="password">登录密码 :</label>
              <el-input v-model="registerForm.password" type="password" placeholder="6-16位数字、字母和符号两种以上组合"></el-input>
              <span class="tips">*</span>
            </el-form-item>
            <el-form-item prop="rePassword">
              <label class="label" for="rePassword">确认密码 :</label>
              <el-input v-model="registerForm.rePassword" type="password" placeholder="6-16位数字、字母和符号两种以上组合"></el-input>
              <span class="tips">*</span>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="login()">立即注册</el-button>
               <div class="no-account"><span @click="$router.push({ name: 'login' })" class="cursor default"><icon-svg name="circle" class="site-sidebar__menu-icon" style="vertical-align: -2px;margin-right: 10px;"></icon-svg><span class="span">已有账号？</span>去登录</span></div> 
            </el-form-item>
          </el-form>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  
  import SIdentify from '@/components/identify'
  export default {
    data () {
       window.addEventListener("popstate", function(e) {
          window.history.pushState({}, "", "/login");
      });
      var validateReffer = (rule, value, callback) => {

      }

      var checkPass = (rule, value, callback) => {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
          // console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入6-16位数字、字母组合密码'));
          }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkImgCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空'));
        } else if (value.toUpperCase() !== this.identifyCode.toUpperCase()) {
          callback(new Error('验证码不一致!'));
        } else {
          callback();
        }
      };
      return {
        identifyCodes: "1234567890abcdefghjkmnopqrstuvwxyzABCDEFGHJKMNOPQRSTUVWXYZ",
        identifyCode: "",
        
        registerForm: {
          userNumber: '',
          referrer:'',
          password: '',
          rePassword:''
        },
        registerFormRule: {
          userNumber: [{
            required: true,
            message: '会员编号不能为空',
            trigger: 'blur'
          },
          {
           required: true,
           min:10,
           message:'会员编号长度应为10位',
           trigger: 'blur'}
          ],
          referrer:[{required: true,
            message: '推荐码不能为空',
            trigger: 'blur'}],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {required: true,validator: checkPass,trigger: 'blur'}
          ],
          
          rePassword: [{
            required: true,
            validator: validatePass2,
            trigger: 'blur'}
          ],
        },
        rememberPass: false
        //      captchaPath: ''
      }

    },
    components: {
      SIdentify
    },
    mounted(){
    },
    methods: {
      // 登录
      login () {
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/user/login'),
              method: 'post',
              data: this.$http.adornData({
                'userNumber': this.registerForm.userNumber,
                'loginPassword': this.registerForm.password
              })
            }).then(({data}) => {
              if (data && data.code === '0000') {
                this.$cookie.set('user', data.data)
                this.$router.replace({
                  name: 'home'
                })
                window.sessionStorage.removeItem('user')
                window.sessionStorage.setItem('user', data.data)
                this.$message({
          message: '登录成功',
          type: 'success'
        });
              } else {
                this.$message.error(data.msg)
                this.refreshCode()
              }
            })
          }
        })
      },

    }
  }
</script>

<style lang="scss">

</style>
