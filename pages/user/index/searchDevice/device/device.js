let deviceDetail = require('../../../../../global/global.js').deviceDetail;
let deviceComment = require('../../../../../global/global.js').deviceComment;
let track = require('../../../../../global/global.js').track;
let cancelTrack = require('../../../../../global/global.js').cancelTrack;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: 'detail', //详细信息或评论
        detailColor: "#000000", //设置选中颜色
        commentColor: "#bbbbbb",
        device: {},
        comment: {},
        d_no: "",
        track: 0,// 是否跟踪设备 0：没有跟踪该设备 1：正在跟踪该设备
        lock: 0 //跟踪锁
    },
    //预约设备
    reserve: function () {
        var device = this.data.device
        console.log(device)
        if (device.d_state === "在库") {
            wx.navigateTo({
                url: '/pages/user/index/searchDevice/device/reserveDevice/reserveDevice' +
                    '?d_no=' + this.data.d_no,
            })
        } else if (device.d_state === "外借") {
            console.log("当前设备无法不允许")
            wx.showToast({
                title: '当前设备不在库,无法预约;您可以选择跟踪设备',
                icon: "none",
                duration: 3000
            })
        } else {
            console.log("当前设备无法不允许")
            wx.showToast({
                title: '当前设备已损坏,无法预约;您可以选择跟踪设备',
                icon: "none",
                duration: 3000
            })
        }

    },
    //跟踪设备
    track: function () {
        var that = this;
        if (that.data.lock == 0) {
            that.setData({
                lock: 1
            })
            wx.login({
                success(res) {
                    wx.request({
                        url: track,
                        data: {
                            d_no: that.data.device.d_no,
                            code: res.code
                        },
                        method: 'POST',
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success(res) {
                            console.log(res.data)
                            if (res.data.flag == 1) {
                                console.log(res.data)
                                wx.showToast({
                                    title: '跟踪设备成功',
                                })
                                that.setData({
                                    track: 1,
                                    lock: 0 //释放锁
                                })
                            }
                            else {
                                wx.showToast({
                                    title: res.data.errMsg[0],
                                    icon: "none"
                                })
                            }
                        }
                    })
                }
            })
        }

    },
    // 取消跟踪
    disTrack: function () {
        var that = this;
        if (that.data.lock == 0) {
            that.setData({
                lock: 1
            })
            wx.login({
                success(res) {
                    wx.request({
                        url: cancelTrack,
                        data: {
                            d_no: that.data.device.d_no,
                            code: res.code
                        },
                        method: 'POST',
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success(res) {
                            if (res.data.flag == 1) {
                                console.log(res.data)
                                wx.showToast({
                                    title: '取消跟踪成功',
                                })
                                that.setData({
                                    track: 0,
                                    lock: 0
                                })
                            }
                            else {
                                wx.showToast({
                                    title: res.data.errMsg[0],
                                    icon: "none"
                                })
                            }
                        }
                    })
                }
            })
        }

    },
    //改变页面显示为 详细信息
    toDetail: function () {
        this.setData({
            choice: "detail",
            detailColor: "#000000",
            commentColor: "#bbbbbb"
        })
    },
    //改变页面显示为 评论
    toComment: function () {
        this.setData({
            choice: "all",
            detailColor: "#bbbbbb",
            commentColor: "#000000"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            d_no: options.d_no,
        })
        console.log(this.data.d_no);
        var that = this;
        wx.login({
            success(res) {
                wx.request({
                    url: deviceDetail,
                    data: {
                        d_no: that.data.d_no,
                        code: res.code
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                        if (res.data.flag == 1) {
                            that.setData({
                                device: res.data.device,
                                track: res.data.track
                            })
                        }
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }
                    }
                })
            }
        })

        // 获取评论
        wx.request({
            url: deviceComment,
            data: {
                d_no: that.data.d_no
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                console.log(res.data)
                if (res.data.flag === 1) {
                    that.setData({
                        comment: res.data.comment
                    })
                }
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