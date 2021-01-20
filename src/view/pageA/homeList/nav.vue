<template>
  <div id="nav">
      <div class="navTabber">
        <div class="nav_header">
          <div>经销商系统</div>
          <div class="nav_header_img">
              <img src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E4%BF%A1%E6%81%AF@2x.png" alt="">
              <div class="_i"></div>
          </div>
        </div>
        <div class="nav_center">
            <div class="nav_center_img">
                <img src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/200x200_01@2x.png" alt="">
            </div>
            <div class="nav_center_content">
                <h4>唐先生</h4>
                <p>总代理(A001)</p>
            </div>
        </div>
        <div class="nav_footer">
            <div class="nav_footer_list" v-for="(item,index) in navList" :key="index">
                <div class="nav_footer_listHeader">{{item.label}}</div>
                <div>{{item.num}}</div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            navList:[
                {
                    num: "9876.00",
                    label: "金币"
                },
                {
                    num: "345.00",
                    label: "奖励"
                },
                {
                    num: "876.00",
                    label: "记账"
                },
                {
                    num: "123",
                    label: "存货"
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
#nav{
    width: 100%;
    .navTabber {
    width: 100%;
    height: 4.8rem;
    background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/bg@2x%20(2).png")
      no-repeat center;
    background-size: 100% 4.8rem;
    color: #fff;
    box-sizing: border-box;
    padding: 0.4rem;
    .nav_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.4rem;
      font-weight: 500;
      .nav_header_img{
          width: 0.4rem;
          height: 0.4rem;
          position: relative;
          img{
              width: 100%;
              height: 100%;
          }
          ._i{
              position: absolute;
              top: -0.05rem;
              right: -0.05rem;
              width: 0.16rem;
              height: 0.16rem;
              background: #ff0202;
              border-radius: 50%;
          }
      }
    }
    .nav_center{
        display: flex;
        align-items: center;
        margin: 0.4rem 0rem 0.66rem;
        .nav_center_img{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            margin-right: 0.24rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .nav_center_content{
            h4{
                font-size: 0.32rem;
                font-weight: 400;
                margin-bottom: 0.16rem;
            }
            p{
                font-size: 0.24rem;
                font-weight: 500;
            }
        }
    }
    .nav_footer{
        display: flex;
        justify-content: space-between;
        font-size: 0.24rem;
        font-weight: 500;
        padding-right: 0.5rem;
        box-sizing: border-box;
        .nav_footer_list{
            .nav_footer_listHeader{
                margin-bottom: 0.26rem;
            }
        }
    }
  }
}
</style>