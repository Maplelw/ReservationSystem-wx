// pages/mine/details/preservation/preservation.js
let booked = require('../../../../global/global.js').booked;
let cancelReservation = require('../../../../global/global.js').cancelReservation;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        device: []
    },
    // 取消预约
    cancel: function(e) {
        var r_no = this.data.device[e.currentTarget.dataset.index].r_no;
        console.log("被选择的编号")
        console.log(r_no)
        wx.showModal({
            title: '提示',
            content: '是否取消预约',
            success: (res) => {
                if (res.confirm) {
                    wx.login({
                        success: function(res) {
                            wx.request({
                                url: cancelReservation,
                                data: {
                                    r_no: r_no  //预约编号
                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                success: function (res) {
                                    console.log(res.data)
                                },
                                fail: function (res) {
                                    consol .log("请求失败")
                                },
                            })
                        }
                    })
                    
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.login({
            success: function(res) {
                wx.request({
                    url: booked,
                    data: {
                        code: res.code
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                        console.log(res.data)
                        that.setData({
                            device: res.data.reservation
                        })
                    },
                    fail: function(res) {
                        consolo.log("请求失败")
                    },

                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})