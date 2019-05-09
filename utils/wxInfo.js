var userInfo = {}
const loginAndRegister = (fallback,notAuthFn) => {
  wx.login({
    success(res) {
      if (res.code) {
        // 发起网络请求
        wx.request({
          url: 'https://www.cjywjsr.xyz/user/wxLogin',
          data: {
            loginCode: res.code
          },
          success: function (r) {
            var _result = r.data;
            var _code = _result.code;
            console.info(_code);
            if (_code == "0000") {
              console.info(_result.value);
              userInfo["openId"] = _result["value"]["openid"];



              wx.getSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                      success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        userInfo.nickName = res.userInfo.nickName;
                        userInfo.avatarUrl = res.userInfo.avatarUrl;

                        isExitsUser(userInfo["openId"],fallback);
                        // fallback(userInfo);
                      }
                    })
                  }
                  else
                  {

                    console.info("用户没有授权");
                    notAuthFn();
                  }
                 
                }
              });
            }

            


          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  });
  
  return userInfo;
}

var isExitsUser = function(openId,fallback)
{

  wx.request({
    url: 'https://www.cjywjsr.xyz/user/queryByWxCode?openId=' + openId,
    method:"POST",
    // data: {
    //   openId: openId
    // },
    success: function (r) {

      var _result = r.data;
      var _code = _result.code;
      console.info(_code);
      if (_code == "0000") {
        console.info(_result.value);
    
        if (!_result.value)
        {
          
          register(userInfo, fallback);
        }
        else
        {

          console.info("********" + _result.value.id);
          userInfo = _result.value;


          fallback(userInfo);
        }
      }

    }
  });
}


var register = function(userIfo,fallback){

  console.info(userIfo);
  wx.request({
    url: 'https://www.cjywjsr.xyz/user/registerAndLogin',
    method: "POST",
    data: userIfo,
    success: function (r) { 


      var _result = r.data;
      var _code = _result.code;
      var _msg = _result.msg;
      console.info("register code " + _code);

      if( _code != '0000')
      {
        console.info(_msg);
      }
      else{
        userInfo = _result.value;
        fallback(userIfo);
        console.info(userIfo.nickName + "注册成功！");
      }
    }
  });
}


const getUserInfo = () => {
  console.info(userInfo);
  return userInfo;
}

module.exports = {
  loginAndRegister: loginAndRegister,
  getUserInfo: getUserInfo
}