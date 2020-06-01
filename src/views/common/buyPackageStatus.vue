<template>
  <div>
    <h2 class="el-card__body-title">{{status == 0 ? '支付成功' : '支付失败'}}</h2>
    <div class="el-card__body-cont">
      <div class="pay-status suc" v-if="status==0">
        <div class="top">
          <!--<img src="/static/img/success.png">-->
          <pay-success-animation></pay-success-animation>
          <div class="text">
            <h4>恭喜您，您已成功支付订单！</h4>
          </div>
        </div>
        <div class="bottom">
          <el-button @click="showOrder">查看订单</el-button>
          <el-button type="primary" @click="continueBuy">继续购买</el-button>
        </div>
      </div>
      <div class="pay-status suc" v-if="status==1">
        <div class="top">
          <!--<img src="/static/img/warning.png">-->
          <pay-success-animation></pay-success-animation>
          <div class="text">
            <h4>抱歉，订单支付失败！</h4>
            <p>失败原因：{{msg}}</p>
          </div>
        </div>
        <div class="bottom">
          <el-button type="primary" @click="continueBuy">重新购买</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import paySuccessAnimation from '@/components/paySuccessAnimation'
export default {
  data() {
    return {
      status: null,
      msg: '订单异常'
    };
  },
  components:{
    paySuccessAnimation
  },
  created(){
    this.status = this.$route.params.status;
    this.msg = this.$route.params.msg;
    this.validateForm();
  },
  methods: {
    validateForm(){
      if(this.status==null){
        this.$router.push({name: 'voucher'});
      }
    },
    showOrder(){
      this.$router.push({name: 'order'});
    },
    continueBuy(){
      this.$router.push({name: 'voucher'});
    }
  }
};
</script>