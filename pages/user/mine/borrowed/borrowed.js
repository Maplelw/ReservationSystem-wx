// pages/mine/details/borrowed/borrowed.js
let borrowed = require('../../../../global/global.js').borrowed;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        borrowed_item: [
        {
            name: "博冠马卡 200/2400",
            workingPrinciple: "三片式马卡",
            mainParameter: "三片式马卡产品 焦距：2400mm",
            date: "2019-10-25",
            place: "物电院B301",
            state: "借用中"
        },
        {
            name: "博冠马卡 200/2400",
            workingPrinciple: "三片式马卡",
            mainParameter: "三片式马卡产品 焦距：2400mm",
            date: "2019-10-25",
            place: "物电院B301",
            state: "已归还"
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var that = this;
    wx.login({
        success: function(res){
            wx.request({
                url: borrowed,
                data: {
                    code: res.code
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function (res) {
                    console.log(res.data)
                    that.setData({
                        borrowed_item: res.data.borrowed_item
                    })
                },
                fail: function (res) {
                    consolo.log("请求失败")
                },

            }) 
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