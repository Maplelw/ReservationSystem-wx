let getCredit = require('../../../../global/global.js').getCredit;
let getCreditRule = require('../../../../global/global.js').getCreditRule;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isRuleShow: false,
        u_creditScore: "",
        comment: "信用很好，优先借用",
        u_creditScore: 100,
        page: 1, // 页数
        flag: 0, // 是否最后一页
        record: [],
        creditRule: ["1.按时归还仪器", "2.逾期未按时归还仪器（小于等于1个星期，1个星期按7天来算"],
    },
    //弹窗打开与关闭
    showRule: function () {
        this.setData({
            isRuleShow: true
        })
    },
    hideRule: function () {
        this.setData({
            isRuleShow: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.login({
            success: function (res) {
                wx.request({
                    url: getCredit,
                    data: {
                        code: res.code,
                        page: that.data.page
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                        console.log(res.data)
                        if (res.data.flag === 1) {
                            that.setData({
                                record: res.data.record,
                                page: that.data.page + 1,
                                u_creditScore: res.data.score
                            })
                            var scoreInt = parseInt(res.data.score)
                            if (scoreInt < 80) {
                                that.setData({
                                    comment: '信用分不足啦，请注意准守规则'
                                })
                            }
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
                //获取规则
                wx.request({
                    url: getCreditRule,
                    data: {
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                        console.log(res.data)
                        if (res.data.flag === 1) {
                            that.setData({
                                creditRule: res.data.creditRuleList,
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
        }
        else {
            wx.login({
                success(res) {
                    wx.request({
                        url: getCredit,
                        data: {
                            page: that.data.page,
                            code: res.code
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            console.log(that.data.record)
                            console.log("page:" + that.data.page)
                            if (res.data.flag == 0) {
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
                                    record: that.data.record.concat(res.data.record),
                                    page: that.data.page + 1
                                })
                            }
                        },
                        fail: function (res) {
                            console.log("请求失败")
                        }
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