let getMessage = require('../../../../global/global.js').getMessage;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        messages: [
            {
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
    onLoad: function (options) {
        var that = this;
        wx.login({
            success: function (res) {
                wx.request({
                    url: getMessage,
                    data: {
                        code: res.code
                    },
                    success(res) {
                        console.log(res.data)
                        that.setData({
                            messages: res.data.messages
                        })
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