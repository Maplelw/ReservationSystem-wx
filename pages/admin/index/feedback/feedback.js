let getFeedbackContent = require('../../../../global/global.js').getFeedbackContent;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1, // 页数
        flag: 0, // 是否最后一页
        feedback: []
    },

    // 回复反馈
    reply(e) {
        var index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: 'reply/reply?' + "fb_no=" + this.data.feedback[index].fb_no + "&fb_content=" + this.data.feedback[index].fb_content,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: getFeedbackContent,
            data: {
                page: that.data.page
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                console.log(res.data)
                if (res.data.flag === 1) {
                    that.setData({
                        feedback: res.data.feedback,
                        page: that.data.page + 1
                    })
                }
                else {
                    wx.showToast({
                        title: res.data.errMsg[0],
                        icon: "none"
                    })
                }
            },
            fail() {
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
        var that = this
        if (that.data.flag === 1) { // 到最后一页了
            wx.showToast({
                title: '已经到最后一个设备',
                icon: "loading",
                duration: 500
            })
        } else {
            wx.login({
                success(res) {
                    wx.request({
                        url: getFeedbackContent,
                        data: {
                            page: that.data.page,
                            code: res.code
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            console.log(that.data.feedback)
                            console.log("page:" + that.data.page)
                            if (res.data.flag === 0) {
                                that.setData({
                                    flag: 1
                                })
                                wx.showToast({
                                    title: '已经到最后一个设备',
                                    icon: "loading",
                                    duration: 500
                                })
                            } else {
                                that.setData({
                                    feedback: that.data.feedback.concat(res.data.feedback),
                                    page: that.data.page + 1
                                })
                            }
                        },
                        fail: function (res) {
                            console.log("请求失败")
                        },
                    })
                }
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})