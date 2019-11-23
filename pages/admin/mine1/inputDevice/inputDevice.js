let inputDevice = require('../../../../global/global.js').inputDevice;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    d_no:"",
    d_name:"",
    d_manager:"",
    d_storage_place:"",
    d_description:"",
    d_time:"",
    d_photo:""
  },


  IDInput: function(e){
    this.setData({
      d_no: e.detail.value
    });
  },
  nameInput: function (e) {
    this.setData({
      d_name: e.detail.value
    });
  },
  managerInput: function (e) {
    this.setData({
      d_manager: e.detail.value
    });
  },
  placeInput: function (e) {
    this.setData({
      d_storage_place: e.detail.value
    });
  },
  desInput: function (e) {
    this.setData({
      d_description: e.detail.value
    });
  },
  timeInput: function (e) {
    this.setData({
      d_time: e.detail.value
    });
  },
  uploadImg: function () {
    wx.chooseImage({
      count: 9,
      sizeType: [],
      sourceType: [],
      success: function (res) {
        var photoPath=res.tempFilePaths
        this.setData({
          d_photo: photoPath
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handin: function(e){
    var that = this;
    wx.request({
      url: inputDevice,
      data: {
        adminCode: e.code,
        d_no: e.d_no,
        d_name: e.d_name,
        d_manager: e.d_manager,
        d_storage_place: e.d_storage_place,
        d_description: e.d_description,
        d_time: e.d_time,
        d_photo: e.d_photo
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
  onLoad: function (options) {
    
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