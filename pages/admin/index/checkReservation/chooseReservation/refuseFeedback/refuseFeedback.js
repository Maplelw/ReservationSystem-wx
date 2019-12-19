// pages/admin/index/checkReservation/chooseReservation/refuseFeedback/refuseFeedback.js
let refuseReservation = require('../../../../../../global/global.js').refuseReservation; 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        r_no:　'',
        message: ''
    },

    // 发送反馈信息
    sendMessage: function(res) {
        var that = this
        wx.request({
            url: refuseReservation,
            data: {
                r_no: that.data.r_no,
                r_feedBack: that.data.message
            },
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
                console.log(res.data)
                if(res.data.flag == 1) {
                    wx.navigateBack({})
                }
                else {
                    wx.showToast({
                        title: res.data.errMsg[0],
                        icon: "none"
                    })
                }
            }
        })
    },
    // 获取输入内容
    getInput: function(e) {
        this.setData({
            message: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("上个页面传来的预约编号：" + options.r_no);
        this.setData({
            r_no:　options.r_no
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