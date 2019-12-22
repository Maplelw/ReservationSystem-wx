let confirmReturn = require('../../../../../global/global.js').confirmReturn;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        b_no: "", //上个页面传来的b_no
    },

    // 提交评价
    submitfeedback: function (e) {
        var that = this
        console.log("反馈：" + e.detail.value.feedbackContent)
        console.log("状态：" + e.detail.value.state)
        wx.login({
            success(res) {
                wx.request({
                    url: confirmReturn,
                    data: {
                        b_no: that.data.b_no,
                        comment: e.detail.value.feedbackContent,
                        rd_state: e.detail.value.state
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                        if (res.data.flag == 1) {
                           wx.navigateBack({})
                        }
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none",
                                duration: 1000,
                                success() {
                                    setTimeout(function(){
                                        wx:wx.navigateBack({})
                                    },2000)
                                    
                                }
                            })
                        }
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("上个页面传来的b_no:" + options.b_no)
        this.setData({
            b_no: options.b_no,
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