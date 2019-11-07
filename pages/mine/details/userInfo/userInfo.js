let login = require('../../../../global/global.js').login;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        u_name: "",
        u_userno: "",
        u_phone: "",
        u_email: "",
        u_user_type: "",
        u_classno: ""
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
        wx.getUserInfo({
            success: function (res) {
                that.setData({ iconUrl: res.userInfo.avatarUrl });
                that.setData({ userName: res.userInfo.nickName });
            }
        }),
            wx.request({
                url: login,
                data: {
                    u_wechatid: "043ydeZ21oqM8Q1nKaY21vlsZ21ydeZa"
                },
                success(res) {
                    console.log(res.data.data.u_name);
                    that.setData({
                        u_name: res.data.data.u_name,
                        u_userno: res.data.data.u_userno,
                        u_phone: res.data.data.u_phone,
                        u_email: res.data.data.u_email,
                        u_user_type: res.data.data.u_user_type,
                        u_classno: res.data.data.u_classno
                    })
                },
                fail(res) {
                    console.log("请求失败");
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})