// pages/mine/details/borrowed/borrowed.js
let finishedBorrow = require('../../../../global/global.js').finishedBorrow;
let unfinishedBorrow = require('../../../../global/global.js').unfinishedBorrow;
let showQRCode = require('../../../../global/global.js').showQRCode;
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
        isQRcode: false,
        isComment: false,
        img: "",
        borrowed_itemIng: [],
        borrowed_itemDone: []
    },
    //顶部状态改变    
    //改变页面显示为 ing
    toIng: function () {
        this.setData({
            choice: "ing",
            ingColor: "#89AFD4",
            doneColor: "#bbbbbb"
        })
    },
    //改变页面显示为 done
    toDone: function () {
        this.setData({
            choice: "done",
            ingColor: "#bbbbbb",
            doneColor: "#89AFD4"
        })
    },
    //正在借用    
    // 获取归还二维码
    getQRcode: function (e) {
        var that = this
        var t = e.currentTarget.dataset.index;
        var b_no = that.data.borrowed_itemIng[t].b_no;
        that.setData({
            isQRcode: true
        }),
            wx.login({
                success(res) {
                    wx.request({
                        url: showQRCode,
                        data: {
                            b_no: b_no
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success(res) {
                            console.log(res.data)
                            that.setData({
                                img: res.data,
                                isTrue: true
                            })
                        }
                    })
                }
            })
    },
    //关闭二维码
    hideCode: function () {
        this.setData({
            isQRcode: false
        })
    },
    //已完成
    // 跳转到评论界面 
    showComment: function (e) {
        var t = e.currentTarget.dataset.index
        var b_no = this.data.borrowed_itemDone[t].b_no
        console.log("设备编号：" + b_no)
        wx.navigateTo({
            url: 'comment/comment' + '?b_no=' + b_no,
        })
    },
    //设备的具体信息
    getDeviceDetail: function (e) {
        var t = e.currentTarget.dataset.index
        var d_no = this.data.borrowed_item[t].d_no
        console.log("设备编号：" + d_no)
        wx.navigateTo({
            url: '/pages/user/index/searchDevice/device/device' + '?d_no=' + d_no,
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
        wx.login({
            success: function (res) {
                // ing
                wx.request({
                    url: unfinishedBorrow,
                    data: {
                        code: res.code,
                        page: that.data.pageIng
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                        console.log("未完成")
                        console.log(res.data)
                        if (res.data.flag === 1) {
                            that.setData({
                                borrowed_itemIng: res.data.borrowed_item
                            })
                        }
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }
                    },
                    fail: function (res) {
                        console.log("请求失败")
                    },
                })
            }
        })
        wx.login({
            success: function (res) {
                // done
                wx.request({
                    url: finishedBorrow,
                    data: {
                        code: res.code,
                        page: that.data.pageDone
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                        console.log("已经完成")
                        console.log(res.data)
                        if (res.data.flag === 1) {
                            that.setData({
                                borrowed_itemDone: res.data.borrowed_item
                            })
                        }
                        else {
                            wx.showToast({
                                title: res.data.errMsg[0],
                                icon: "none"
                            })
                        }
                    },
                    fail: function (res) {
                        console.log("请求失败")
                    },
                })
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
                            url: unfinishedBorrow,
                            data: {
                                page: that.data.pageIng,
                                code: res.code,
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
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
                                        borrowed_itemIng: that.data.borrowed_itemIng.concat(res.data.borrowed_item),
                                        pageDone: that.data.pageDone + 1
                                    })
                                    console.log(that.data.borrowed_itemIng)
                                }
                            },
                            fail: function (res) {
                                console.log("请求失败")
                            },
                        })
                    }
                })
            }
        }
        else { //done
            if (that.data.flagDone === 1) { // 到最后一页了
                wx.showToast({
                    title: '已经到最后一个设备',
                    icon: "loading",
                    duration: 500
                })
            } else {
                wx.login({
                    success(res) {
                        wx.request({
                            url: finishedBorrow,
                            data: {
                                page: that.data.pageDone,
                                code: res.code,
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                console.log(res.data)
                                if (res.data.flag === 0) {
                                    that.setData({
                                        flagDone: 1
                                    })
                                    wx.showToast({
                                        title: '已经到最后一个设备',
                                        icon: "loading",
                                        duration: 500
                                    })
                                } else {
                                    that.setData({
                                        borrowed_itemDone: that.data.borrowed_itemDone.concat(res.data.borrowed_item),
                                        pageDone: that.data.pageDone + 1
                                    })
                                    console.log(that.data.borrowed_itemDone)
                                }
                            },
                            fail: function (res) {
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
    onShareAppMessage: function () {

    }
})