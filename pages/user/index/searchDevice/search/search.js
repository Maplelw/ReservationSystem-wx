let searchDevice = require('../../../../../global/global.js').searchDevice;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchDevice: [],
        input: "",
    },

    // 搜索内容改变
    input: function (e) {
        this.setData({
            input: e.detail.value
        })
    },
    // 提交搜索
    search: function (e) {
        var that = this
        console.log("提交内容:" + e.detail.value)
        console.log("提交内容:" + that.data.input)
        wx.login({
            success: function (res) {
                wx: wx.request({
                    url: searchDevice,
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        keyword: that.data.input,
                    },
                    success: function (res) {
                        console.log(res.data)
                        that.setData({
                            searchDevice: res.data.device
                        })
                    },
                    fail: function (res) {
                        console.log("请求失败")
                    }
                })
            }
        })
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