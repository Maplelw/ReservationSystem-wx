let respondToFeedback = require('../../../../../global/global.js').respondToFeedback;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fb_no: "", //反馈编号
        fb_content: "", //反馈内容
        replyContent: ""
    },
//回复
    // 获取评价
    getreply: function (res) {
        this.setData({
            replyContent: res.detail.value
        })
    },

    // 提交评价
    submitreply: function () {
        var that = this
        console.log("反馈：" + that.data.replyContent)
        wx.showLoading({
            title: '正在提交',
            mask: true
        })
        wx.login({
            success(res) {
                wx.request({
                    url: respondToFeedback,
                    data: {
                        f_no: that.data.fb_no,
                        content: that.data.replyContent
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                        if (res.data.flag == 1) {
                            wx.hideLoading()
                            wx.navigateBack({})
                        }
                        else {
                            wx.showToast({
                                title: res.flag.errMsg[0],
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
        console.log("传来的反馈编号：" + options.fb_no)
        this.setData({
            fb_no: options.fb_no,
            fb_content: options.fb_content
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