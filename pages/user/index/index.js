let getUnReadMessage = require('../../../global/global.js').getUnReadMessage;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: "hot",
        hotColor: "#000000",
        allColor: "#bbbbbb",
        hotDevice: [],
        allDevice: [],
        messages: [], // 用户的消息
        navigator: [{ // 导航栏
            img: "/img/global/nv_index_on.png",
            name: "首页"
        },
        {
            img: "/img/global/nv_mine_off.png",
            name: "我的"
        }
        ]
    },

    //导航变化
    navigate: function (e) {
        var index = e.currentTarget.dataset.index;
        if (index == 1) {
            wx.redirectTo({
                url: '/pages/user/mine/mine',
            })
        }
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
        // 获取未读消息
        var that = this
        wx.login({
            success: function (res) {
                wx.request({
                    url: getUnReadMessage,
                    data: {
                        code: res.code,
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success(res) {
                        console.log(res.data)
                        if (res.data.flag == 1) {
                            if (res.data.errMsg == "当前无未读消息")
                            that.setData({
                                messages: null,
                            })
                            else {
                                that.setData({
                                    messages: res.data.messageList,
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