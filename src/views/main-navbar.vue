<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">平台充值</a>
        <a class="site-navbar__brand-mini" href="javascript:;">充值</a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu class="site-navbar__menu"  mode="horizontal">
        <el-menu-item class="site-navbar__switch site-navbar__switch1" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
        <el-menu-item class="site-navbar__switch site-navbar__switch2" index="1" @click="sidebarToggle = !sidebarToggle">
          <div class="navbar-toggle">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </div>
        </el-menu-item>
      </el-menu>
      <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link down-item">
              <img src="static/img/avatar.png" :alt="userName">
              <span class="userName">admin{{ userName }}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logoutHandle()">
                <icon-svg name="out" class="site-sidebar__menu-icon"></icon-svg>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      return {
        updatePassowrdVisible: false
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      sidebarToggle: {
        get () { return this.$store.state.common.sidebarToggle },
        set (val) { this.$store.commit('common/updateSidebarToggle', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    methods: {
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
          url: this.$http.adornUrl('/app/user/logout'),
          method: 'post'
        }).then(({
          data
        }) => {
        if(data && (data.code === 0)) {
          this.$cookie.delete('accessToken')
          this.$cookie.delete('refreshToken')
          this.$message.success(data.msg)
          this.loginStatus = '0'
          this.$router.push({
            name: 'login'
          })
        } else {
          this.$message.error(data.msg)
        }
      })
      }).catch(() => {})
      },
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      }
    }
  }
</script>
