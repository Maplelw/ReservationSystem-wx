// pages/homepage/user_details/apply_order/apply_order.js
var getDate = require('../../../../../../utils/util.js').formatDate;
let reserve = require('../../../../../../global/global.js').reserve;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startDate: "",
        returnDate: "",
        currentDate: "",
        nextDate: "",
        d_no: "11",
        lock: 0, //提交的锁
    },

    //确定预约按钮
    reserve: function(e) {
        var that = this;
        console.log("开始时间：" + that.data.startDate)
        console.log("归还时间：" + that.data.returnDate)
        if (that.data.startDate >= that.data.returnDate) {
            wx.showToast({
                title: '归还时间必须在借用时间之后,且借用时间必须大于一天',
                icon: "none"
            })
        } else {
            if (that.data.lock == 0) {
                that.setData({ // 锁
                    lock: 1
                })
                wx.login({
                    success(res) {
                        wx.request({
                            url: reserve,
                            method: 'POST',
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                d_no: that.data.d_no,
                                code: res.code,
                                startDate: that.data.startDate,
                                returnDate: that.data.returnDate
                            },
                            success(res) {
                                console.log(res.data)
                                that.setData({ // 释放锁
                                    lock: 0
                                })
                                if (res.data.flag === 0) {
                                    wx.showToast({
                                        title: res.data.errMsg[0],
                                        icon: "none",
                                    })
                                } else {
                                    wx.showToast({
                                        title: '预约成功',
                                        success() {
                                            wx.reLaunch({
                                                url: '/pages/user/index/index',
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
            else {
                console.log("已经提交过了，还没返回")
            }
        }
    },

    //切换借用开始时间
    startChange: function(e) {
        console.log(e.detail.value);
        this.setData({
            startDate: e.detail.value
        })
    },

    //切换归还时间
    returnChange: function(e) {
        console.log(e.detail.value);
        this.setData({
            returnDate: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 获取今天
        var t = new Date()
        var curDate = getDate(t);
        var nextDate = getDate(new Date(t.getTime() + 24 * 60 * 60 * 1000));
        console.log("今天" + curDate)
        console.log("后一天" + nextDate)
        this.setData({
            currentDate: curDate,
            nextDate: nextDate,
            startDate: curDate,
            returnDate: nextDate,
            d_no: options.d_no
        })
        console.log('上个页面传来的设备编号' + this.data.d_no)
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