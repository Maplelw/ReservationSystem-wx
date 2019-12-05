let submitComment = require('../../../../../global/global.js').submitComment;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topic: "满意",
        satisfied: "/img/user/select_satisfied.png",
        unsatisfied: "/img/user/unselect_unsatisfied.png",
        comment: "",
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
            comment: res.detail.value
        })
    },

    // 提交评价
    submitComment: function () {
        var that = this
        console.log("评价内容：" + that.data.comment)
        wx.login({
            success(res) {
                wx.request({
                    url: comment,
                    data: {
                        d_no: that.data.d_no,
                        comment: comment
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("上个页面传来的d_no:" + options.d_no)
        this.setData({
            d_no: options.d_no,
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