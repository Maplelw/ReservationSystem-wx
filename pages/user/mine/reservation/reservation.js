let finishedReservation = require('../../../../global/global.js').finishedReservation;
let unfinishedReservation = require('../../../../global/global.js').unfinishedReservation;
let cancelReservation = require('../../../../global/global.js').cancelReservation;
let agreeEditReservation = require('../../../../global/global.js').agreeEditReservation;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageIng: 1, // 页数
        pageDone: 1, // 页数
        flagIng: 0, // 是否最后一页
        flagDone: 0, // 是否最后一页
        choice: "ing",
        ingColor: "#89AFD4",
        doneColor: "#bbbbbb",
        reservationIng: [],
        reservationDone: []
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
                                    if (res.data.flag == 1) {
                                        that.data.reservationIng.splice(e.currentTarget.dataset.index, 1)
                                        that.setData({
                                            reservationIng: that.data.reservationIng
                                        })
                                        that.refreshDone()
                                    } else {
                                        wx.showToast({
                                            title: res.data.errMsg[0],
                                            icon: "none"
                                        })
                                    }

                                },
                                fail: function(res) {
                                    console.log("请求失败")
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

    // 同意修改
    agree: function(e) {
        var that = this;
        var r_no = this.data.reservationIng[e.currentTarget.dataset.index].r_no
        console.log("被选择的预约编号" + r_no)
        wx.showModal({
            title: '提示',
            content: '是否同意修改时间',
            success: (res) => {
                if (res.confirm) {
                    wx.login({
                        success: function(res) {
                            wx.request({
                                url: agreeEditReservation,
                                data: {
                                    r_no: r_no //预约编号
                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                success: function(res) {
                                    console.log(res.data)
                                    if (res.data.flag == 1) {
                                        var t = that.data.reservationIng
                                        t[e.currentTarget.dataset.index].r_state = 3
                                        console.log(t)
                                        that.setData({
                                            reservationIng: t
                                        })
                                    } else {
                                        wx.showToast({
                                            title: res.data.errMsg[0],
                                            icon: "none"
                                        })
                                    }
                                },
                                fail: function(res) {
                                    console.log("请求失败")
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
    //预约其他设备
    reserveElse: function(e) {
        wx.reLaunch({
            url: '/pages/user/index/index',
        })
    },
    refreshIng() {
        var that = this
        that.setData({
            pageIng: 1
        })
        wx.login({
            success(res) {
                // 正在处理的预约
                wx.request({
                    url: unfinishedReservation,
                    data: {
                        code: res.code,
                        page: that.data.pageIng
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                        console.log("未完成")
                        console.log(res.data)
                        if(res.data.flag == 1) {
                            that.setData({
                                reservationIng: res.data.reservation,
                                pageIng: that.data.pageIng + 1
                            })
                        }
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }
                    },
                    fail: function(res) {
                        console.log("请求失败")
                    },
                })
            }
        })
    },
    refreshDone() {
        var that = this
        that.setData({
            pageDone: 1
        })
        wx.login({
            success: function(res) {
                // 已经完成
                wx.request({
                    url: finishedReservation,
                    data: {
                        code: res.code,
                        page: that.data.pageDone
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                        console.log("已经完成")
                        console.log(res.data)
                        if(res.data.flag == 1 ) {
                            that.setData({
                                reservationDone: res.data.reservation,
                                pageDone: that.data.pageDone + 1
                            })
                        }   
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }                                            
                    },
                    fail: function(res) {
                        console.log("请求失败")
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
                // 已经完成
                wx.request({
                    url: finishedReservation,
                    data: {
                        code: res.code,
                        page: that.data.pageDone
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                        console.log("已经完成")
                        console.log(res.data)
                        if(res.data.flag == 1 ) {
                            that.setData({
                                reservationDone: res.data.reservation,
                                pageDone: that.data.pageDone + 1
                            })
                        }
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }                          
                    },
                    fail: function(res) {
                        console.log("请求失败")
                    },
                })
            }
        })
        wx.login({
            success(res) {
                // 正在处理的预约
                wx.request({
                    url: unfinishedReservation,
                    data: {
                        code: res.code,
                        page: that.data.pageIng
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                        console.log("未完成")
                        console.log(res.data)
                        if(res.data.flag == 1) {
                            that.setData({
                                reservationIng: res.data.reservation,
                                pageIng: that.data.pageIng + 1
                            })
                        }
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }     
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
        var that = this
        if (that.data.choice === 'ing') {
            if (that.data.flagIng === 1) { // 到最后一页了
                wx.showToast({
                    title: '已经到最后一个设备',
                    icon: "loading",
                    duration: 500
                })
            } else {
                wx.login({
                    success(res) {
                        wx.request({
                            url: unfinishedReservation,
                            data: {
                                page: that.data.pageIng,
                                code: res.code,
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(res) {
                                console.log(res.data)
                                if (res.data.flag === 0) {
                                    that.setData({
                                        flagIng: 1
                                    })
                                    wx.showToast({
                                        title: '已经到最后一个设备',
                                        icon: "loading",
                                        duration: 500
                                    })
                                } else {
                                    that.setData({
                                        reservationIng: that.data.reservationIng.concat(res.data.reservation),
                                        pageIng: that.data.pageIng + 1
                                    })
                                    console.log(that.data.reservationIng)
                                }
                            },
                            fail: function(res) {
                                console.log("请求失败")
                            },
                        })
                    }
                })
            }
        } else if (that.data.choice === 'done') {
            if (that.data.flagDone === 1) { // 到最后一页了
                wx.showToast({
                    title: '已经到最后',
                    icon: "loading",
                    duration: 500
                })
            } else {
                wx.login({
                    success(res) {
                        wx.request({
                            url: finishedReservation,
                            data: {
                                page: that.data.pageDone,
                                code: res.code,
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(res) {
                                console.log(res.data)
                                if (res.data.flag === 0) {
                                    that.setData({
                                        flagDone: 1
                                    })
                                    wx.showToast({
                                        title: '已经到最后',
                                        icon: "loading",
                                        duration: 500
                                    })
                                } else {
                                    that.setData({
                                        reservationDone: that.data.reservationDone.concat(res.data.reservation),
                                        pageDone: that.data.pageDone + 1
                                    })
                                    console.log(that.data.reservationDone)
                                }
                            },
                            fail: function(res) {
                                console.log("请求失败")
                            },
                        })
                    }
                })
            }
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})