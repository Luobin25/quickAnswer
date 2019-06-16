var lSdata = require("../data/single.js").postList;
var lMdata = require("../data/multi.js").postList;
var app = getApp();

function initData() {
  var selectData = [];
  var lslength = lSdata.length;
  var lmlength = lMdata.length;
  // 因为设置了是10道题，这里就固定7道单选，3道选择
  // var count = app.globalData.ALL_PASS_COUNT;
  var count = 7;
  for(var i = 0; i < count; i++){
    var ran = Math.floor(Math.random() * (lslength - i));
    selectData.push(lSdata[ran]);
    lSdata[ran] = lSdata[lslength - i - 1];
  }
  count = 3;
  for (var i = 0; i < count; i++) {
    var ran = Math.floor(Math.random() * (lmlength - i));
    selectData.push(lMdata[ran]);
    lMdata[ran] = lMdata[lmlength - i - 1];
  }

  console.log(selectData)
  return selectData;
};

module.exports = {
  initData: initData
}