let reservationDetail = require('../../../../global/global.js').reservationDetail;
let confirmReturn = require('../../../../global/global.js').confirmReturn;
let handleBorrow = require('../../../../global/global.js').handleBorrow
Page({

    /**
     * 页面的初始数据
     */
    data: {
        input: "搜索内容",
        borrow: []
    },
    // 扫一扫
    getScancode: function () {
        var that = this;
        // 允许从相机和相册扫码
        wx.scanCode({
            success: (res) => {
                console.log(res.result)
                wx.request({
                    url: confirmReturn,
                    data: {
                        b_no: res.result,
                    },
                    method: 'POST',
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                        console.log(res.data)
                    }
                })
            }
        })
    },
    //确认归还按钮
    confirm: function (e) {
        var that = this
        wx.showModal({
            title: '提示',
            content: '确认归还',
            success: (res) => {
                if (res.confirm) {
                    wx.request({
                        url: confirmReturn,
                        data: {
                            b_no: that.data.borrow[e.currentTarget.dataset.index].b_no,
                        },
                        method: 'POST',
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success: function (res) {
                            that.data.borrow.splice(e.currentTarget.dataset.index, 1)
                            that.setData({
                                borrow: that.data.borrow
                            })
                            console.log(res.data)
                        },
                        fail: function (res) {
                            consolo.log("请求失败")
                        },
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    // 搜索内容改变
    input: function(e) {
        this.setData({
            input: e.detail.value
        })
    },
    // 提交搜索
    search: function(e) {
        console.log("提交内容:")
        console.log(e.detail.value)
        wx.login({
            success: function(res) {
                wx: wx.request({
                    url: '',
                    data: {
                        content: e.detail.value,
                        code: res.code
                    },
                    success: function(res) {
                        console.log(res.data)

                    },
                    fail: function(res) {
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
        var that = this
        wx:wx.login({
            success: function(res) {
                wx.request({
                    url: handleBorrow,
                    data: {
                        code: res.code
                    },
                    method: 'POST',
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                        console.log(res.data)
                        that.setData({
                            borrow: res.data.device
                        })
                    },
                    fail: function (res) {
                        console.log("请求失败")
                    },
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