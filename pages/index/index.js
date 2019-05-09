//index.js
//获取应用实例
const app = getApp()
const wxUtil = require("../../utils/wxInfo.js");
const util = require("../../utils/util.js");

var calendar  = null;

var isBirthDay  = function(d,list){

  var flag = false;
  for (var j = 0; j < list.length; j++) {

    if (d == list[j]) {
      console.info("今天有人生日 " + list[j]);
      flag = true;
      break ;
    }
   
  }
  return flag;
}

Page({
  data: {
    www: '你好，欢迎使用超级鹦鹉记生日',
    days:0,
    week:0,
    current:"",
    today:"",
    userInfo: {},
    hasUserInfo: false,
    nowMonth: new Date().getMonth(),
    nowYear: new Date().getFullYear(),
    chooseMonth: null,
    chooseYear: null,
    birthDayCount: 0 ,
    birthDayList : null,
    authModelVisible:false,
    authBtnShow:false,
    authModelAction:[{
      name: '同意'
    }],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    wxUtil.loginAndRegister(this.setUserInfo, this.notAuthFn);


    calendar = util.CalendarObj;
    calendar.setDateObj(new Date());

    this.setData({
      // days: util.getDaysOfMonth(calendar.getDateObj()),
      week: util.weekDaysOfFirstDay(calendar.getDateObj()),
      current: util.dateToStr(calendar.getDateObj()),
      today: util.getCurrentDate(new Date()),
      chooseMonth: calendar.getDateObj().getMonth(),
      chooseYear: calendar.getDateObj().getFullYear()
    });


  
  },
  setUserInfo:function(userInfo)
  {

    
    this.setData({
      userInfo: userInfo
    });
    this.getIndexBirthDayInfo(userInfo.id, calendar.getDateObj());
  },



 preMonth: function () {
   var _d = calendar.getDateObj();
   _d.setMonth(_d.getMonth() -1);


  
   this.setData({
    //  days: util.getDaysOfMonth(_d),
     week: util.weekDaysOfFirstDay(_d),
     current: util.dateToStr(_d),
     chooseMonth: _d.getMonth(),
     chooseYear: _d.getFullYear()
    //  today: util.getCurrentDate(_d)
   });

   this.getIndexBirthDayInfo(wxUtil.getUserInfo().id,_d);
  },



  notAuthFn: function () {
    //  wxUtil.loginAndRegister(this.setUserInfo,this.errorAuth);
    this.setData({
      authBtnShow: true
    });
  },

  authModelClick:function(){
    this.setData({
      authModelVisible: true
    });
  },

  agreenAuth:function(){

    this.setData({

      authBtnShow:false

    });

    this.onLoad();
  },


   nextMonth : function () {


     var _d = calendar.getDateObj();
     _d.setMonth(_d.getMonth()+1);

     this.setData({
      //  days: util.getDaysOfMonth(_d),
       week: util.weekDaysOfFirstDay(_d),
       current: util.dateToStr(_d),
          chooseMonth: _d.getMonth(),
       chooseYear: _d.getFullYear()
      //  today: util.getCurrentDate(_d)
     });

     this.getIndexBirthDayInfo(wxUtil.getUserInfo().id,_d);

  },
  getIndexBirthDayInfo : function ( userid , dd) {


    
    var _this = this;
    // console.info(_this.data.userInfo.id);
    wx.request({
      url: 'https://www.cjywjsr.xyz/index/indexInfo',
      data: {
        userId: userid,
        dateStr: util.dateToStr(dd)
      },
      success: function (r) {

        var _result = r.data;
        var _code = _result.code;
        var _msg = _result.msg;
        var _value = _result.value;


        if (_code != '0000') {
          console.info(_msg);
        }
        else {

          console.info(_value);


          var monthOfDays = util.getDaysOfMonth(dd);

          _this.setData({
            birthDayCount: _value.count,
            birthDayList: _value.birthDateList
          });

          var birthDayList = _value.birthDateList;
          for (var i = 0; i < monthOfDays.length; i++) {
            // console.info("=====" + monthOfDays[i].dayNum)
            if (null != birthDayList && birthDayList.length > 0) {

              monthOfDays[i]["isBirthDay"] = isBirthDay(monthOfDays[i].dayNum+1,birthDayList);

            }
          }
          _this.setData({
            days: monthOfDays
          });
        }
      },
      fail: function () {

        var monthOfDays = util.getDaysOfMonth(dd);
        _this.setData({
          days: monthOfDays
        });
      }
    });

  },

  getFriendByBirthDay:function( e ){
      let _this = this;
    
    let day = e.target.dataset.day ? e.target.dataset.day < 10 ? '0' + e.target.dataset.day : '' + e.target.dataset.day : 0;
    console.info(_this.data.current.trim()+'-'+ day.trim());
    wx.reLaunch({
      url: '../friend/friend?searchKeyword=' + _this.data.current.trim() + '-' + day.trim()
    })
  
  }


  
  
})



