// pages/answer/answer.js
var sc = require("../../service/service.js");
var app = getApp();
var reply = [];
var daan = [];
var point = 0;
var datas = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.currIdx = 0;
    point = 0;
    datas = sc.initData();
    this.initPage();
  },

  initPage: function() {
    var currIdx = this.data.currIdx;
    if (!currIdx) {
      currIdx = 0;
    }
    var obj = datas[currIdx];

    //把正确答案先取出，再打乱顺序
    daan = [];
    reply = [];
    if (obj.type == 0) {
      daan = obj.content[obj.idx[0]];
    } else {
      obj.idx.forEach((i) => {
        daan.push(obj.content[i])
      });
    }

    console.log(daan);
    // 打乱顺序
    var answers = obj.content;
    answers.sort(function() {
      return 0.5 - Math.random();
    });

    this.setData({
      obj: obj,
      answers: answers,
      currIdx: currIdx,
    })
  },

  change: function(e) {
    reply = e.detail.value;
  },

  promtp: function(title, content) {
    var that = this;
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function(res) {
        if (res.confirm && that.data.currIdx < app.globalData.ALL_PASS_COUNT - 1) {
          that.setData({
            currIdx: that.data.currIdx + 1
          });
          that.initPage();
        } else {
          app.globalData.testFinish = true;
          app.globalData.point = point;
          wx.switchTab({
            url: '/pages/my/my'
          });
        }
      }
    })
  },

  submit: function() {
    if (reply.length == 0) {
      wx.showToast({
        title: '请回答',
        icon: 'none',
        duration: 1000
      });
      return;
    }
    if (this.data.obj.type == 0) {
      if (reply === daan) {
        point += 10;
        this.promtp("回答成功", "+10分");
      } else {
        this.promtp("回答错误", daan);
      }
    } else {
      if (JSON.stringify(reply.sort()) === JSON.stringify(daan.sort())) {
        point += 10;
        this.promtp("回答成功", "+10分");
      } else {
        this.promtp("回答错误", daan.join(","));
      }
    }
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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

  }
})