let login = require('../../../../global/global.js').login;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        u_credit_score: "",
        comment: "信用极好，优先借用",
        record: [
            {
                date: "2019-10-1",
                equipmentName: "博冠马卡 200/4000"
            },
            {
                date: "2019-10-1",
                equipmentName: "博冠马卡 200/4000"
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
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
        var that = this;
        wx.request({
            url: login,
            data: {
                u_wechatid: "043ydeZ21oqM8Q1nKaY21vlsZ21ydeZa"
            },
            success(res) {
                console.log(res.data.data.u_name);
                that.setData({
                    u_credit_score: res.data.data.u_credit_score
                })
            },
            fail(res) {
                console.log("请求失败");
            }
        })
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