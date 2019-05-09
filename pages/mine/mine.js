// pages/mine/mine.js

const wxUtil = require("../../utils/wxInfo.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  

    this.setData({ userInfo: wxUtil.getUserInfo()})
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

  onShareAppMessage:function(res)
  {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }


    return {
      imageUrl:"/images/share.jpg",
      title: '填写您的生日信息',
      path: '/pages/friend/addfriend?userId='+ wxUtil.getUserInfo().id,
      success: function (res) {
        console.info('转发成功')
      },
      fail: function (res) {
        // 转发失败
      }
    }


  },

  inventiedFriend:function(){



  }
})