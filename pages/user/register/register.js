let register = require('../../../global/global.js').register;
let getSecurityCode = require('../../../global/global.js').getSecurityCode
Page({

    /**
     * 页面的初始数据
     */
    data: {
        code: "",//临时code，用户后端获取微信唯一标识openid
        type: false,//账户类型 true:学生 false:老师 
        u_phone: "",
        securityCode: "",//验证码
        errorMsg: ""
    },

    // 获取验证码
    getSecurityCode: function() {
        console.log(this.data.u_phone);
        var that = this;
        wx.request({
            url: getSecurityCode,
            data: {
                u_phone: that.data.u_phone
            },
            success(res) {
                that.setData(
                    {securityCode:res.data.securityCode}
                )
                console.log(that.data.securityCode);
            }
        })
    },

    formSubmit: function(e) {
        //校验验证码
        // if(true) {
        //if(e.detail.data.securityCode = this.data.securityCode) {//校验成功
            var that = this;
            wx.login({
                success(res) {
                    console.log(res.code);
                    that.setData({ code: res.code });
                    wx.request({
                        url: register,
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            code: that.data.code,
                            u_no: e.detail.value.u_no,
                            u_name: e.detail.value.u_name,
                            u_email: e.detail.value.u_email,
                            u_phone: e.detail.value.u_phone,
                            u_type: e.detail.value.u_type,
                            u_major_class: e.detail.value.u_major_class,
                            u_mentor_name: e.detail.value.u_mentor_name,
                            u_mentor_phone: e.detail.value.u_mentor_phone
                        },
                        success: function(res) {
                            console.log(res.data)
                        }
                    })
                },
                fali(res) {
                    console.log("获取code失败")
                }
            })
        //} 
        // else {//验证码不正确
        //    this.setData({
        //        errorMsg: "验证码错误"
        //    }) 
        // }
    },

    // 根据学生/老师选项修改type
    radioChange: function (e) {
        if (e.detail.value == 'student')
            this.setData({ type: true })
        else
            this.setData({ type: false })
    },

    phoneInput: function(e) {
        this.data.u_phone = e.detail.value;
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