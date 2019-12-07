let handleReservation = require('../../../../global/global.js').handleReservation;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        device: [],
        page: 1
    },

    getDetails: function(e) {
        var param = e.currentTarget.dataset.index;
        var d_no = this.data.device[param].d_no;
        var d_name = this.data.device[param].d_name;
        wx.navigateTo({
            url: '/pages/admin/index/checkReservation/chooseReservation/chooseReservation' + '?d_no=' + d_no +　"&d_name=" + d_name
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.login({
            success(res) {
                wx.request({
                    url: handleReservation,
                    method: 'POST',
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        code: res.code,
                        page: that.data.page
                    },
                    success(res) {
                        console.log(res.data)
                        that.setData({
                            device: res.data.device,
                            page: that.data.page + 1
                        })
                    }
                })
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})