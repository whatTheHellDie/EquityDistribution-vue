<template>
  <div class="pay-bg">
  <div class="pay-img">
    <canvas id="myCanvas">当前浏览器不支持canvas组件请升级！</canvas>
    <div class="gou-wrap">
        <img src="/static/img/gou.png" class="gou" />
    </div>
   支付成功
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      var c = document.getElementById('myCanvas');
      var ctx = c.getContext('2d');

      var mW = c.width = 100;
      var mH = c.height = 100;
      var lineWidth = 3;
      var r = mW / 2; //中间位置
      var cR = r - 4 * lineWidth; //圆半径
      var startAngle = -(100 / 2 * Math.PI); //开始角度
      console.log(startAngle)
      var endAngle = startAngle + 2 * Math.PI; //结束角度
      var xAngle = 4.5 * (Math.PI / 180); //偏移角度量
      var fontSize = 16; //字号大小
      var tmpAngle = startAngle; //临时角度变量

      //渲染函数
      var rander = function() {
        if(tmpAngle >= endAngle) {
          return;
        } else if(tmpAngle + xAngle > endAngle) {
          tmpAngle = endAngle;
        } else {
          tmpAngle += xAngle;
        }
        ctx.clearRect(0, 0, mW, mH);

        //画圈
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = '#67b426';
        ctx.translate(r, r); //重定义圆点
        ctx.rotate(-Math.PI); //最上方为起点
        for(var i = 0; i <= tmpAngle - startAngle; i += xAngle) { //绘图
          ctx.moveTo(0, cR - lineWidth);
          ctx.lineTo(0, cR);
          ctx.rotate(xAngle); //通过旋转角度和画点的方式绘制圆
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        //写字
        ctx.fillStyle = '#1d89d5';
        ctx.font = fontSize + 'px arial';
        ctx.textAlign = 'center';
        //  ctx.fillText( Math.round((tmpAngle -  startAngle) / (endAngle - startAngle) * 100) + '%', r, r + fontSize / 2);
        var percent = Math.round((tmpAngle - startAngle) / (endAngle - startAngle) * 100);
        if(percent == 100) {
          document.querySelectorAll(".gou-wrap")[0].classList.add("active")
        }
        requestAnimationFrame(rander);
      };

      rander();
    },
    deactivated(){
      ctx.clearRect(0, 0, mW, mH); 
      document.querySelectorAll(".white")[0].classList.remove("active")
    }
  }
</script>

<style scoped="scoped">
  .pay-bg{z-index: 9999;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(255,255,255,.3);}
  #myCanvas {
    margin: 0 auto;
    display: block;
  }
  
  .pay-img {
    text-align: center;
    font-size: 24px;
    font-weight: 800;
    color: #67b426;
    width: 100px;
    position: relative;
    zoom: .8;
    position: relative;
    top: 50%;
    left: 50%;
    margin-left: -40px;
    margin-top: -40px;
  }
  
  .pay-img .gou-wrap {
    width: 0px;
    height: 60px;
    position: absolute;
    top: 20px;
    left: 20px;
    overflow: hidden;
    border-radius: 50%;
    transition: width 2s ;
  }
  .pay-img .gou-wrap.active{
    width: 60px;
  }
  .pay-img .gou {
        width: 48px;
    display: block;
    margin: 6px;
  }
  
  
  
</style>