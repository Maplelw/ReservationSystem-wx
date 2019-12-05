let reservation = require('../../../../global/global.js').reservation;
let cancelReservation = require('../../../../global/global.js').cancelReservation;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,// 页数
        flag: 0,// 是否最后一页
        choice: "ing",
        ingColor: "#89AFD4",
        doneColor: "#bbbbbb",
        reservation: [{
                d_name: "显微镜",
                d_no: "EK1005S",
                r_reservationDate: "2019-01-02",
                r_startDate: "2019-01-02",
                r_returnDate: "2019-01-02",
                r_state: 1,
                r_no: 0
            },
            {
                d_name: "显微镜",
                d_no: "EK1005S",
                r_reservationDate: "2019-01-02",
                r_startDate: "2019-01-02",
                r_returnDate: "2019-01-02",
                r_state: 0,
                r_no: 0
            }
        ]
    },
    //改变页面显示为 热门
    toIng: function() {
        this.setData({
            choice: "ing",
            ingColor: "#89AFD4",
            doneColor: "#bbbbbb"
        })
    },
    //改变页面显示为 所有
    toDone: function() {
        this.setData({
            choice: "done",
            ingColor: "#bbbbbb",
            doneColor: "#89AFD4"
        })
    },
    // 取消预约
    cancel: function(e) {
        var that = this;
        var r_no = this.data.reservationIng[e.currentTarget.dataset.index].r_no
        console.log("被选择的预约编号" + r_no)
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
                                    r_no: r_no //预约编号
                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                success: function(res) {
                                    console.log(res.data)
                                    // 页面删减一项
                                    that.data.reservationIng.splice(e.currentTarget.dataset.index, 1)
                                    that.setData({
                                        reservationIng: that.data.reservationIng
                                    })
                                },
                                fail: function(res) {
                                    consol.log("请求失败")
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
    //查看反馈
    feedback: function(e) {
        console.log(e.currentTarget.dataset.index)
        var r_no = this.data.reservationIng[e.currentTarget.dataset.index].r_no
        console.log("被选择的预约编号")
        console.log(r_no)
        wx.login({
            success: function(res) {
                wx.request({
                    url: feedback,
                    data: {
                        r_no: r_no //预约编号
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                        console.log(res.data)
                    },
                    fail: function(res) {
                        consol.log("请求失败")
                    },
                })
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
                    url: reservation,
                    data: {
                        code: res.code,
                        page: that.data.page
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                        console.log(res.data)
                        that.setData({
                            reservation: res.data.reservation,
                        })
                    },
                    fail: function(res) {
                        console.log("请求失败")
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
        if (that.data.flag === 1) {// 到最后一页了
            wx.showToast({
                title: '已经到最后一个设备',
                icon: "loading",
                duration: 500
            })
        }
        else {
            wx.request({
                url: reservation,
                data: {
                    page: that.data.page,
                    code: res.code,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    console.log(res.data)
                    var oldRecord = that.data.record
                    var newRecord;
                    if (res.data.flag === 0) {
                        that.setData({
                            flag: 1
                        })
                        wx.showToast({
                            title: '已经到最后一个设备',
                            icon: "loading",
                            duration: 500
                        })
                    }
                    else {
                        newRecord = oldRecord.concat(res.data.record)
                        console.log(newRecord)
                        that.setData({
                            Record: newRecord,
                            page: that.data.page + 1
                        })
                    }
                },
                fail: function (res) { console.log("请求失败") },
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})