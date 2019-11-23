let batchInputDevice = require('../../../../global/global.js').batchInputDevice;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePath:""
  },

  uploadFile: function (e) {
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success: function (res) {
        var fPath = res.tempFilePaths
        this.setData({
          filePath: fPath
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handin: function (e) {
    var that = this;
    wx.request({
      url: batchInputDevice,
      data: {
        adminCode: e.code,
        filePath: e.filePath
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log("请求失败")
      }
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