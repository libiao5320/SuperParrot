// pages/friend/addfriend.js

const wxUtil = require("../../utils/wxInfo.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexSwitch : true,
    birtyDayTypeSwitch:true,
    birtyDay : null,
    birthDayType:1,
    sex:1,
    userId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      var _this = this;
      _this.setData({
        userId:options.userId
      });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  formReset:function(e){
    this.setData({
      allValue: ''
    })
  },

  addFriend : function(e){
    var _this = this;
    console.info(e.detail.value);

    var friendData = e.detail.value;

    console.info("获取到分享用户的id" + _this.data.userId);
    friendData.userId = _this.data.userId ? _this.data.userId : wxUtil.getUserInfo().id;
    friendData.birthDayType = this.data.birthDayType;
    // friendData.birthday = this.data.birthday;
    friendData.sex = this.data.sex;

      console.info("addFriend ");
     console.info(friendData);
      wx.request({
        url: 'https://www.cjywjsr.xyz/frient/addFriend/',
        method:"post",
        data:friendData,
        success:function(r)
        {
          var _result = r.data;
          var _code = _result.code;
          var _msg = _result.msg;
          var _value = _result.value;


          if (_code != '0000') {
            console.info(_msg);
          }
          else {
            console.info("添加好友成功！");
            wx.switchTab({
              url: '../friend/friend'
            });
            console.info("添加好友成功！2");
          }
        


        },
        fail:function(r)
        {

        }
      })
      console.info("表单提交")
      _this.setData({
        userId:null
      });
  }
  ,
  sexChange(event) {
    const detail = event.detail;
    this.setData({
      'sexSwitch': detail.value,
      'sex': detail.value?1:0
    })
    // console.info("*****" + this.data.sex);

  },
  bindbirthDayChange(event){
    // console.info("*****" + event.detail.value);
      this.setData({
        'birtyDay': event.detail.value
      })

  },
  sexBirthDayTypeChange( event ){


    console.info(event.detail.value);
    this.setData({
      'birtyDayTypeSwitch': event.detail.value,
      'birtyDayType': event.detail.value ? 1 : 0
    })
  }

})