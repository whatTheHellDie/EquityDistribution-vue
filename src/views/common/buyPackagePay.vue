<template>
  <div>
    <h2 class="el-card__body-title">订单支付</h2>
    <div class="el-card__body-cont">
      <el-form ref="form" :model="form" label-width="20%">
        <el-form-item label="支付币种：">
          <span>USDT</span>
        </el-form-item>
        <el-form-item label="支付数额：">
          <p>约 <span class="red">{{USDTSum}}</span></p>
        </el-form-item>
        <el-form-item label="交易所手续费币种：">
          <span>{{currency}}</span>
        </el-form-item>
        <el-form-item label="交易所手续费数额：">
          <p>约<span class="red">{{serviceChargeNum}}</span></p>
        </el-form-item>
        <el-form-item label="交易所安全密码：">
          <el-input type="password" v-model="payPassword"></el-input>
        </el-form-item>
        <el-form-item class="red" label="温馨提示：">
          <span>币价值实时变动，以实际支付时的汇率和数额为准</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
          @click="paymentOrder"
          :element-loading-text="a_text"
          element-loading-background="rgba(0, 0, 0, 0.4)"
          v-loading.fullscreen.lock="fullscreenLoading"
          >提交订单</el-button>
        </el-form-item>
      </el-form>
      <pay-success-animation></pay-success-animation>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      payPassword: '',
      typeIndex: null,
      money: 0,
      USDTSum: 0,         // 支付的USDT
      currency: 'BLC',    // 手续费币种
      serviceCharge: 0,   // 手续费率
      serviceChargeNum: 0,
      fullscreenLoading: false,
      a_text: '正在支付中'
    };
  },
  created(){
    this.typeIndex = this.$route.params.typeIndex;
    this.money = this.$route.params.money;
    this.USDTSum = this.$route.params.USDTSum;
    this.currency = this.$route.params.currency;
    this.serviceCharge = this.$route.params.serviceCharge;
    this.validateForm();
  },
  methods: {
    validateForm(){
      if(this.typeIndex==null || this.money==null || this.USDTSum==null || this.currency==null || this.serviceCharge==null){
        this.$router.push({name: 'voucher'});
      }else{
        this.calculateServiceCharge();
      }
    },

    calculateServiceCharge(){
      this.serviceChargeNum = (parseFloat(this.USDTSum)*parseFloat(this.serviceCharge)).toFixed(8);
    },

    // 支付订单
    paymentOrder(){
      if(this.payPassword == null || this.payPassword == ''){
        this.$alert('请输入支付密码', '提示', {
          confirmButtonText: '确定'
        });
        return;
      }
      
      this.fullscreenLoading = true;
      var _url = '';
      var _params = {};
      if(this.typeIndex == 0){
        _url = '/app/charge'
        _params = {
          'chargeType': '1',
          'chargePrice': this.money,
          'chargeQuantity': '1',
          'coinType': 'USDT',
          'securityPassword': this.payPassword
        };
      }else{
        _url = '/app/buyTTJP';
        _params = {
          'buyNum': this.money,
          'payPassword': this.payPassword
        };
      }

      this.$http({
        url: this.$http.adornUrl(_url),
        method: 'post',
        params: this.$http.adornParams(_params)
      }).then(({data}) => {
        var _this = this;
        var _form = {};
        var _a_text = '';
        if(data && data.code === 0){
          _form = {status:0};
          _a_text = '支付成功';
        }else{
          _form = {status:1,msg:data.msg};
          _a_text = '支付失败';
        }
        setTimeout(
          function(){
            _this.a_text = _a_text;
            setTimeout(
              function(){
                _this.fullscreenLoading = false;
                _this.$router.push({name: 'buyPackageStatus',params: _form});
              },
            500);
          },
        1000);
      })
    }
  }
};
</script>