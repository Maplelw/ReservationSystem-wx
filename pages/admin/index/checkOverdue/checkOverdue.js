let overDue = require('../../../../global/global.js').overDue;
let remindOverDue = require('../../../../global/global.js').remindOverDue;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1, // 页数
        flag: 0, // 是否最后一页
        borrow: []
    },

    //提醒按钮
    remind: function (e) {
        var that = this
        wx.showModal({
            title: '提示',
            content: '确认提醒',
            success: (res) => {
                if (res.confirm) {
                    wx.request({
                        url: remindOverDue,
                        data: {
                            b_no: that.data.borrow[e.currentTarget.dataset.index].b_no
                        },
                        method: 'POST',
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success: function (res) {
                            if(res.data.flag == 1) {
                                console.log(res.data)
                                wx.showToast({
                                    title: "已经向用户发送消息",
                                    icon: "none"
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
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this
        wx.login({
            success: function(res) {
                wx.request({
                    url: overDue,
                    data: {
                        code: res.code,
                        page: that.data.page 
                    },
                    method:　'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                        console.log(res.data)
                        if(res.data.flag === 1) {
                            console.log(res.data)
                            that.setData({
                                borrow: res.data.borrow,
                                page: 　that.data.page + 1
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
        var that = this
        if (that.data.flag === 1) { // 到最后一页了
            wx.showToast({
                title: '已经到最后一个设备',
                icon: "loading",
                duration: 500
            })
        } else {
            wx.login({
                success(res) {
                    wx.request({
                        rl: overDue,
                        data: {
                            code: res.code,
                            page: that.data.page
                        },
                        method: 　'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            console.log(that.data.borrow)
                            console.log("page:" + that.data.page)
                            if (res.data.flag === 0) {
                                that.setData({
                                    flag: 1
                                })
                                wx.showToast({
                                    title: '已经到最后一个设备',
                                    icon: "loading",
                                    duration: 500
                                })
                            } else {
                                that.setData({
                                    borrow: that.data.borrow.concat(res.data.borrow),
                                    page: that.data.page + 1
                                })
                            }
                        },
                        fail: function (res) {
                            console.log("请求失败")
                        },
                    })
                }
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})