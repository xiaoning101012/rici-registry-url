let baseURL = 'https://tftb.sczwfw.gov.cn:8085/api/jmas-api-gateway-server/createsign.do';
let baseURLList = 'https://tftb.sczwfw.gov.cn:8085/api/jmas-api-gateway-server/gateway.do';
let dsf = "http://47.106.173.136:8090/"
let $Common = {
    //获取签证
    $ObtainSign(url,data,callback){
        $.ajax({
            url:baseURL + url,
            type:'POST',
            header:"",
            dataType:"json",
            data:data,
            success:function(res){
                callback(res)
            }
        })
    },
    //获取列表
    $ObtainList(url,data,callback){
        $.ajax({
            url:baseURLList + url,
            type:'POST',
            dataType:"json",
            data:data,
            success:function(res){
                callback(res)
            }
        })
    },
    //注册信息
    $RegisterInfo(url,data,callback){
      $.ajax({
        url:dsf + url,
        type:'POST',
        header:{
          'Content-Type':'application/json',
        },
        data:{
          "token":"xxxxx",
          "hallCode":"AARH",
          "pwd":"MTIzNDU2Nzh4eHh4eA==",
          "idCard":"443076822",
          "borrowCard":"443076822",
          "isScan":0,
          "cardName":"ace"
        },
        dataType:"json",
        success:function(res){
          callback(res);
        }
      })
    }
};
export default $Common
