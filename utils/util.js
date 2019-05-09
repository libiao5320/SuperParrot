const nl = require("nongli.js");

const dayOfMonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const  dateToStr = date => {
  // var date = new Date();
  var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth()+1) );
  //  + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  return todate;
}


const getCurrentDate = date => {
  // var date = new Date();
  var todate = date.getDate();
  return todate;
}



const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const weekDaysOfFirstDay = date => {
  var _now = new Date();

  _now.setFullYear(date.getFullYear());
  _now.setMonth(date.getMonth());
  _now.setDate(1);

  console.info(_now.getDay());
  return _now.getDay();
}

const getDaysOfMonth = date => {
  // var _now = new Date();
  console.info(date.getMonth());

  var dateArr = [];

  for (var i = 0; i < dayOfMonthArr[date.getMonth()] ; i ++)
  {
    var _d = new Date(date.getFullYear(), date.getMonth(), i+1);

      dateArr[i] = {};
    dateArr[i].dayNum = i; 
    dateArr[i].solarDay = nl.solarDay(_d);
    dateArr[i].solarDay2 = nl.solarDay2(_d);
    dateArr[i].solarDay3 = nl.solarDay3(_d);

  }

  return dateArr;
}


const CalendarObj = {

  dateObj: null,

  setDateObj: function (_dateObj) {
    // var _this = this;
    this.dateObj = _dateObj;
    console.info(_dateObj.getMonth())
  },


  getDateObj: function () {
    // var _this = this;
    // this.dateObj = _dateObj;
    return this.dateObj;
  },

  getYear: function () {
    console.info(this.dateObj);
    // var _this = this;
    return this.dateObj.getFullYear();

  },
  getMonth: function () {
    // var _this = this;
    return this.dateObj.getMonth();
  },
  getDays: function () {
    // var _this = this;
    return this.dateObj.getDate();
  },

  setYear: function (_year) {
    // var _this = this;
    this.dateObj.setYear(_year);
  },
  setMonth: function (_month) {
    // var _this = this;
    this.dateObj.setMonth(_month);
  },
  setDay: function (_day) {
    // var _this = this;
    this.dateObj.setDate(_day);
  },

  getWeekDay: function () {
    // var _this = this;
    return this.dateObj.getDay();
  }


}

module.exports = {
  formatTime: formatTime,
  getDaysOfMonth: getDaysOfMonth,
  weekDaysOfFirstDay: weekDaysOfFirstDay,
  dateToStr: dateToStr,
  getCurrentDate: getCurrentDate,
  CalendarObj: CalendarObj
}
