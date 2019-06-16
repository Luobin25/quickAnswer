// pages/my/my.js
var app = getApp();
var records = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var value = wx.getStorageSync(app.globalData.userInfo ? app.globalData.userInfo.nickName:"defalut");
    if (value)
      records = value
      this.setData({
      records: records,
      userInfo: app.globalData.userInfo
    })
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
    if (app.globalData.testFinish) {      
      var obj = {
        point: app.globalData.point,
        date: this.getDate()
      }
      app.globalData.testFinish = false;
      app.globalData.point = 0;

      records.unshift(obj);
      while(records.length > 5)
        records.pop();
        
      this.setData({
        records: records
      });

      try {
        wx.setStorageSync(app.globalData.userInfo ? app.globalData.userInfo.nickName : "defalut", records)
      } catch (e) {
        console.log("缓存失败...")
      }
    }
  },

  getDate: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = "00" + date.getHours();
    hour = hour.substr(hour.length - 2);
    var minute = "00" + date.getMinutes();
    minute = minute.substr(minute.length - 2);
    var second = "00" + date.getSeconds();
    second = second.substr(second.length - 2);
    var week = date.getDay();
    switch (week) {
      case 1:
        week = "星期一 ";
        break;
      case 2:
        week = "星期二 ";
        break;
      case 3:
        week = "星期三 ";
        break;
      case 4:
        week = "星期四 ";
        break;
      case 5:
        week = "星期五 ";
        break;
      case 6:
        week = "星期六 ";
        break;
      case 0:
        week = "星期日 ";
        break;
      default:
        week = "";
        break;
    }

    return year + "年" + month + "月" + day + "日" + " " + hour + ":" + minute + ":" + second + " " + week;
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

  }
})