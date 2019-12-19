let feedback = require('../../../../global/global.js').feedbackToAdmin;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        feedbackContent: "", //反馈内容
        d_no: "",
    },

    // 获取评价
    getfeedback: function (res) {
        this.setData({
            feedbackContent: res.detail.value
        })
    },

    // 提交评价
    submitfeedback: function () {
        var that = this
        console.log("反馈：" + that.data.feedbackContent)
        wx.showLoading({
            title: '正在提交',
            mask: true
        })
        wx.login({
            success(res) {
                wx.request({
                    url: feedback,
                    data: {
                        code: res.code,
                        comment: that.data.feedbackContent
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                        if (res.data.flag == 1) {
                            wx.hideLoading()
                            wx.showToast({
                                title: '感谢您的反馈',
                                duration: 2000
                            })
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