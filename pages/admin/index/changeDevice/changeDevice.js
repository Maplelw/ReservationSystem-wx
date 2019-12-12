let hot = require('../../../../global/global.js').hot;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotDevice: [],
        allDevice: [],
    },

    //获取热门设备中的具体信息
    getDetails: function (e) {
        var t = e.currentTarget.dataset.index;
        var d_no = this.data.allDevice[t].d_no;
        wx.navigateTo({
            url: 'changeDetail/changeDetail' + '?d_no=' + d_no,
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
        var that = this;
        wx.request({
            url: hot,
            method: 'POST',
            success: function (res) {
                console.log(res.data)
                that.setData({
                    allDevice: res.data.device
                })
            },
            fail: function (res) { console.log("请求失败") },
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