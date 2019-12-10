let getMessage = require('../../../../global/global.js').getMessage;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1, // 页数
        flag: 0, // 是否最后一页
        messages: [{
                m_topic: "预约成功",
                m_content: "您预约的设备望远镜，预约成功了",
                m_date: "2019-03-05"
            },
            {
                m_topic: "预约成功",
                m_content: "您预约的设备望远镜，预约成功了",
                m_date: "2019-03-05"
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        // 获取所有消息
        wx.login({
            success: function(res) {
                wx.request({
                    url: getMessage,
                    data: {
                        code: res.code,
                        page: that.data.page
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                        that.setData({
                            messages: res.data.messages,
                            page: that.data.page + 1
                        })
                    },
                    fail() {
                        console.log("请求失败")
                    }
                })
            },
            fail: function(res) {
                console.log("login失败")
            },
        })
        // 设置所有消息为已读
        wx.login({
            success: function (res) {
                wx.request({
                    url: getMessage,
                    data: {
                        code: res.code,
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                    },
                    fail() {
                        console.log("请求失败")
                    }
                })
            },
            fail: function (res) {
                console.log("login失败")
            },
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
                        url: getMessage,
                        data: {
                            page: that.data.page,
                            code: res.code
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function(res) {
                            console.log(that.data.messages)
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
                                    messages: that.data.messages.concat(res.data.messages),
                                    page: that.data.page + 1
                                })
                            }
                        },
                        fail: function(res) {
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
    onShareAppMessage: function() {

    }
})