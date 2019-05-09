// pages/friend/friend.js
const wxUtil = require("../../utils/wxInfo.js");
const { $Message } = require('../../plugins/iview/dist/base/index');

Page({


  addFriend: function(e) {
    console.info("添加好友事件");
    wx.navigateTo({
      url: '../friend/addfriend'
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    friends: [],
    pageNum: 1,
    pageSize: 10,
    isFromSearch: true,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false,
    searchKeyword:'',
    isIndexSearch:false,
    action_visible: false,
    action_arr:[{
      name: '删除',
      color: '#ed3f14'
    }],
    delId:0

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

      
    var _this = this;

    if ( !!options )
    {
    _this.setData({
      searchKeyword: options.searchKeyword ? options.searchKeyword:'',
      isIndexSearch:true
    });
    }

    
    this.searchList();


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.data.isIndexSearch = false;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.data.isIndexSearch = false;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  searchScrollLower: function() {

    console.info("下啦");
    let that = this;
    console.info("下拉是否还有数据" + that.data.searchLoading);
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        pageNum: that.data.pageNum + 1, //每次触发上拉事件，把searchPageNum+1
        isFromSearch: false //触发到上拉事件，把isFromSearch设为为false
      });
      that.searchList();
    }
  },

  searchList: function() {



    var _this = this;
    console.info(_this.data.pageSize);
    console.info(_this.data.pageNum);
    wx.request({
      url: 'https://www.cjywjsr.xyz/frient/fetchFriend/?pageSize=' + _this.data.pageSize + '&pageNum=' + _this.data.pageNum,
      data: {
        nickName: !_this.data.isIndexSearch ?_this.data.searchKeyword : '',
        birthday: _this.data.isIndexSearch ? _this.data.searchKeyword : '',
        userId: wxUtil.getUserInfo().id
      },
      method: "POST",
      success: function(r) {

        var _result = r.data;
        var _code = _result.code;
        var _msg = _result.msg;
        var _value = _result.value;


        if (_code != '0000') {
          console.info(_msg);
        } else {

          console.info(_value);


          let datalist = [];

          if (_value && _value.length > 0) {
            (_this.data.isFromSearch || _this.data.friends.length == 0 ) ? datalist = _value : datalist = _this.data.friends.concat(_value)

            _this.setData({
              friends: datalist,
              searchLoading:  datalist.length < _this.data.pageSize ? false : true
            });
          } else {

            if ( _this.data.pageNum == 1 )
            {

                _this.setData({
                  friends:[]
                });
            }
            _this.setData({
              searchLoadingComplete: true, //把“没有数据”设为true，显示
              searchLoading: false //把"上拉加载"的变量设为false，隐藏
            });

          }
        }

      }
    });
  },

  keywordSearch: function (e) {
    this.setData({
      pageNum: 1,   //第一次加载，设置1
      isIndexSearch:false,
      isFromSearch: true,  //第一次加载，设置true
      searchLoading: true,  //把"上拉加载"的变量设为true，显示
      searchLoadingComplete: false //把“没有数据”设为false，隐藏
    })
    this.searchList();
  },

  bindKeywordInput: function (e) {
    console.log("输入框事件")
    this.setData({
      searchKeyword: e.detail.value
    })
  },


  delFN:function( e ){

    var _this  = this;

    var delId = e.target.dataset.friendid


    _this.setData({
      delId: delId && delId != 0 ? delId : 0 ,
      action_visible : true
    })


    
  },

  handleActionClickItem :function() {
    // const action = [...this.data.actions2];
    // action[0].loading = true;

    // this.setData({
    //   actions2: action
    // });
    var _this = this;
    var delId = _this.data.delId;
    wx.request({
      url: 'https://www.cjywjsr.xyz/frient/delFriend?friendId=' + delId,
      success:function( r ){

        var _result = r.data;
        var _code = _result.code;
        var _msg = _result.msg;
        var _value = _result.value;

        if (_code != '0000') {
          console.info(_msg);
        } else {
          _this.setData({
            action_visible: false,
            delId: 0
          });
          setTimeout(() => {
            _this.setData({
              friends: [],
              pageNum: 1,
              pageSize: 10,
              isFromSearch: true,
              searchLoading: false, //"上拉加载"的变量，默认false，隐藏
              searchLoadingComplete: false,
              searchKeyword: '',
              action_visible: false});
              _this.onLoad();
            $Message({
              content: '删除成功',
              type: 'success'
            });
          }, 2000);

          
        }
      },
      fail:function( data ){

      }
    })

    
  },
  handleActionCancel:function() {
    this.setData({
      action_visible: false
    });
  }





})