<template>
  <div>
    <h2 class="el-card__body-title">充值中心</h2>
    <div class="el-card__body-cont">
      <el-form ref="form" :model="form" label-width="20%">
        <el-form-item label="充值类型：">
          <div
            class="choose-box"
            v-for="(item, i) in chooseType"
            :class="{active: i == form.typeIndex}"
            @click="typeFn(i)"
          >{{item}}</div>
        </el-form-item>
        <el-form-item label="单价：" v-show="unitPriceShow">
          <span>{{TTJPunitPrice}} 元/枚</span>
        </el-form-item>
        <el-form-item :label="rechargeNum">
          <el-input v-model="form.money" @blur="calculateUSDT"></el-input>
          <span>{{company}} </span><span v-text="msg" style="color:#FF0000"></span>
        </el-form-item>
        <el-form-item label="支付币种：">
          <div class="choose-box active">USDT</div>
        </el-form-item>
        <el-form-item label="支付币数量：">
          <span>约 {{form.USDTSum}} 枚</span>
        </el-form-item>
        <el-form-item label="支付方式：">
          <div class="choose-box active">币利交易所</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createOrder">前往支付</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        typeIndex: 0,
        money: '',
        USDTSum: 0,         // 支付的USDT
        USDTRate: 0,        // 汇率
        currency: '',       // 手续费币种
        serviceCharge: 0    // 手续费率
      },
      msg: '',
      company: '元',
      rechargeNum: '充值金额：',
      chooseType: ['端口', 'TTJP'],
      TTJPunitPrice: 0,
      isLoad: false,
      isCanSubmitted: false,
      unitPriceShow:false
    };
  },
  created(){
    this.queryUSDTRate();
  },
  methods: {
    typeFn(index) {
      this.form.typeIndex = index;
      if(index == 1){
        this.unitPriceShow = true;
        this.rechargeNum = '充值数量：';
        this.company = '';
      }else{
        this.unitPriceShow = false;
        this.rechargeNum = '充值金额：';
        this.company = '元';
      }
      this.calculateUSDT();
    },

    // 查汇率
    queryUSDTRate() {
      if(!this.isLoad) {
        this.isLoad = true;
        this.$http({
          url: this.$http.adornUrl('/app/queryUSDTRate'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.form.USDTRate = data.USDTRate;
            this.form.currency = data.feeCoin;
            this.form.serviceCharge = data.rate;
            this.TTJPunitPrice = data.TTJPUnitPrice;
          }
          this.isLoad = false;
        })
      }
    },

    // 计算USDT数量
    calculateUSDT() {
      this.isCanSubmitted = false;
      if(this.form.money == '' || this.form.money == 0){
        this.form.USDTSum = 0;
        this.msg = '';
        return;
      } else if(!/^[1-9]\d*$/.test(this.form.money)){
        this.msg = '请输入正确的数额';
        return;
      }
      this.msg = '';

      if(this.form.USDTRate == null || this.form.USDTRate == 0){
        this.$alert('系统错误，请刷新页面稍后再次尝试', '提示', {
          confirmButtonText: '确定'
        });
        return;
      }
      if(this.form.serviceCharge == null || this.form.serviceCharge == 0){
        this.$alert('系统错误，请刷新页面稍后再次尝试', '提示', {
          confirmButtonText: '确定'
        });
        return;
      }

      if(this.form.typeIndex == 0){
        this.isCanSubmitted = true;
        this.form.USDTSum = (parseFloat(this.form.money)/parseFloat(this.form.USDTRate)).toFixed(8);
      }else{
        if(this.TTJPunitPrice == null || this.TTJPunitPrice == 0){
          this.$alert('系统错误，请刷新页面稍后再次尝试', '提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        this.isCanSubmitted = true;
        this.form.USDTSum = (parseFloat(this.form.money)*parseFloat(this.TTJPunitPrice)/parseFloat(this.form.USDTRate)).toFixed(8);
      }
    },

    // 提交订单
    createOrder() {
      if(this.form.money == '' || this.form.money == 0){
        this.form.USDTSum = 0;
        this.msg = '请输入要充值的数额';
        return;
      }
      this.calculateUSDT();
      if(!this.isCanSubmitted){
        return;
      }
      this.$router.push({name: 'buyPackagePay',params: this.form});
    }
  }
};
</script>