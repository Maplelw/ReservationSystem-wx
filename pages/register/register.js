let register = require('../../global/global.js').register;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        code: "",
    },

    formSubmit: function(e) {
        var that = this;
        wx.login({
            success(res) {
                console.log(res);
                that.setData({code: res.code});
                wx.request({
                    url: register,
                    method: "POST",
                    data: {
                        u_userno: e.detail.value.user_id,
                        pm_no:"0",
                        cr_ruleno:"0",
                        code: that.data.code,
                        u_name: e.detail.value.user_name,
                        u_email: e.detail.value.email,
                        u_phone: e.detail.value.phone_number,
                        u_user_type: e.detail.value.permmision,
                        u_classno: e.detail.value.class_id,
                        u_credit_score: "80"
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                })
            },
            fali(res) {
                console.log("获取code失败")
            }
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