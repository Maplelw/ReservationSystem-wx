let comment = require('../../../../../global/global.js').comment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topic: "满意",
        satisfied: "/img/user/select_satisfied.png",
        unsatisfied: "/img/user/unselect_unsatisfied.png",
        commentContent: "",
        d_no: "",
    },

    // 是否满意
    satisfied: function() {
        this.setData({
            satisfied: "/img/user/select_satisfied.png",
            unsatisfied: "/img/user/unselect_unsatisfied.png",
            topic: "满意"
        })
    },
    unsatisfied: function () {
        this.setData({
            satisfied: "/img/user/unselect_satisfied.png",
            unsatisfied: "/img/user/select_unsatisfied.png",
            topic: "不满意"
        })
    },

    // 获取评价
    getComment: function(res) {
        this.setData({
            commentContent: res.detail.value
        })
    },

    // 提交评价
    submitComment: function () {
        var that = this
        console.log("评价内容：" + that.data.commentContent)
        wx.showLoading({
            title: '提交中',
            mask: true
        })
        wx.login({
            success(res) {
                wx.request({
                    url: comment,
                    data: {
                        b_no: that.data.b_no,
                        comment: that.data.commentContent
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