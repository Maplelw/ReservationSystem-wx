let addDevice = require('../../../../global/global.js').addDevice
Page({

    /**
     * 页面的初始数据
     */
    data: {
        d_storeDate: "请填写入库日期"
    },
    // 获取入库时间改变
    changeDate(e) {
        this.setData({
            d_storeDate: e.detail.value
        })
    },

    // 提交设备
    submit(e) {
        var that = this
        console.log(e.detail.value)
        wx.request({
            url: addDevice,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                a_no: 3,
                d_factoryNo: e.detail.value.d_factoryNo,
                d_model: e.detail.value.d_model,
                d_name: e.detail.value.d_name,
                d_no: e.detail.value.d_no,
                d_saveSite: e.detail.value.d_saveSite,
                d_state: e.detail.value.d_state,
                d_storeDate: e.detail.value.d_storeDate
            },
            success: function (res) {
                console.log(res.data)
                if (res.data.flag === 1) {
                    wx.showToast({
                        title: '添加成功',
                        duration: 2000
                    })
                    wx.redirectTo({
                        url: '../index',
                    })
                }
            }
        })
    },
    uploadImg: function () {
        wx.chooseImage({
            count: 9,
            sizeType: [],
            sourceType: [],
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
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